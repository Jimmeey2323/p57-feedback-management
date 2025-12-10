// OpenAI Service for Auto-Tagging and Priority Calculation

interface TicketAnalysis {
  tags: string[];
  suggestedPriority: 'low' | 'medium' | 'high' | 'critical';
  sentiment: 'positive' | 'neutral' | 'negative' | 'urgent';
  category: string;
  urgencyScore: number;
}

class OpenAIService {
  private apiKey: string;
  private apiURL = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('OpenAI API: API key not configured. AI features will be disabled.');
    }
  }

  async analyzeTicket(ticketData: {
    category: string;
    subcategory: string;
    description: string;
    customerSentiment?: string;
    formData?: any;
  }): Promise<TicketAnalysis> {
    try {
      if (!this.apiKey) {
        console.warn('OpenAI API: API key not available, using fallback analysis');
        return this.getFallbackAnalysis(ticketData);
      }

      const prompt = this.buildAnalysisPrompt(ticketData);

      const response = await fetch(this.apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant specialized in analyzing customer service tickets for a fitness studio. Your task is to analyze tickets and provide tags, priority levels, and sentiment analysis.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error('OpenAI API request failed');
      }

      const data = await response.json();
      const analysis = JSON.parse(data.choices[0].message.content);

      return {
        tags: analysis.tags || [],
        suggestedPriority: analysis.priority || 'medium',
        sentiment: analysis.sentiment || 'neutral',
        category: ticketData.category,
        urgencyScore: analysis.urgencyScore || 5,
      };
    } catch (error) {
      console.error('OpenAI analysis error:', error);
      // Return fallback analysis
      return this.getFallbackAnalysis(ticketData);
    }
  }

  private buildAnalysisPrompt(ticketData: any): string {
    return `
Analyze this customer service ticket for a fitness studio and provide a JSON response with the following structure:
{
  "tags": ["tag1", "tag2", "tag3"],
  "priority": "low" | "medium" | "high" | "critical",
  "sentiment": "positive" | "neutral" | "negative" | "urgent",
  "urgencyScore": 1-10
}

Ticket Details:
- Category: ${ticketData.category}
- Subcategory: ${ticketData.subcategory}
- Description: ${ticketData.description}
- Customer Sentiment: ${ticketData.customerSentiment || 'Not specified'}

Priority Guidelines:
- "critical": Safety issues, injuries, discrimination, legal concerns, system failures preventing bookings
- "high": Billing errors, membership cancellations, poor instructor behavior, overcrowding, equipment safety
- "medium": Class quality issues, scheduling problems, facility cleanliness, staff service
- "low": Music selection, minor amenities, suggestions, general feedback

Tags should be specific, actionable keywords (e.g., "billing-error", "instructor-behavior", "facility-cleanliness", "technical-issue", "safety-concern", "customer-retention-risk")

Consider:
1. Safety and legal implications
2. Financial impact
3. Customer retention risk
4. Operational urgency
5. Regulatory compliance

Provide ONLY the JSON response, no additional text.
`.trim();
  }

  private getFallbackAnalysis(ticketData: any): TicketAnalysis {
    // Rule-based fallback when OpenAI is unavailable
    const tags: string[] = [];
    let priority: 'low' | 'medium' | 'high' | 'critical' = 'medium';

    // Category-based priority rules
    if (ticketData.category.includes('Health & Safety') || 
        ticketData.subcategory.includes('Injury') ||
        ticketData.subcategory.includes('Emergency')) {
      priority = 'critical';
      tags.push('safety-critical', 'immediate-action-required');
    } else if (ticketData.category.includes('Membership & Billing') ||
               ticketData.subcategory.includes('Billing') ||
               ticketData.subcategory.includes('Payment')) {
      priority = 'high';
      tags.push('billing-issue', 'financial');
    } else if (ticketData.category.includes('Instructor') ||
               ticketData.category.includes('Class Experience')) {
      priority = 'high';
      tags.push('class-quality', 'instructor-related');
    } else if (ticketData.category.includes('Facility')) {
      priority = 'medium';
      tags.push('facility-maintenance');
    }

    // Sentiment-based tags
    if (ticketData.customerSentiment === 'Angry' || ticketData.customerSentiment === 'Frustrated') {
      tags.push('customer-retention-risk');
      // Use safe comparisons with a cast to avoid TypeScript narrowing issues
      if ((priority as any) === 'low') (priority as any) = 'medium';
      if ((priority as any) === 'medium') (priority as any) = 'high';
    }

    // Description keywords
    const description = ticketData.description?.toLowerCase() || '';
    if (description.includes('urgent') || description.includes('immediately')) {
      tags.push('urgent');
      if ((priority as any) === 'low') (priority as any) = 'medium';
    }
    if (description.includes('cancel') || description.includes('refund')) {
      tags.push('cancellation-risk');
    }
    if (description.includes('complaint') || description.includes('dissatisfied')) {
      tags.push('formal-complaint');
    }

    // Category-specific tags
    tags.push(ticketData.category.toLowerCase().replace(/\s+/g, '-'));
    tags.push(ticketData.subcategory.toLowerCase().replace(/\s+/g, '-'));

    return {
      tags: tags.slice(0, 5), // Limit to 5 tags
      suggestedPriority: priority,
      sentiment: this.determineSentiment(ticketData),
      category: ticketData.category,
      urgencyScore: this.calculateUrgencyScore(priority),
    };
  }

  private determineSentiment(ticketData: any): 'positive' | 'neutral' | 'negative' | 'urgent' {
    const sentiment = ticketData.customerSentiment?.toLowerCase() || '';
    
    if (sentiment.includes('angry')) return 'urgent';
    if (sentiment.includes('frustrated') || sentiment.includes('disappointed')) return 'negative';
    if (sentiment.includes('calm') || sentiment.includes('understanding')) return 'neutral';
    
    return 'neutral';
  }

  private calculateUrgencyScore(priority: string): number {
    switch (priority) {
      case 'critical': return 10;
      case 'high': return 7;
      case 'medium': return 5;
      case 'low': return 3;
      default: return 5;
    }
  }

  calculateEstimatedClosureDate(priority: string, createdAt: Date = new Date()): Date {
    const closureHours: Record<string, number> = {
      'critical': 4,   // 4 hours
      'high': 24,      // 1 day
      'medium': 48,    // 2 days
      'low': 120,      // 5 days
    };

    const hours = closureHours[priority] || 48;
    const closureDate = new Date(createdAt);
    closureDate.setHours(closureDate.getHours() + hours);

    return closureDate;
  }
}

export const openAIService = new OpenAIService();
