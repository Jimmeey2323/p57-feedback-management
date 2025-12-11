// Email Notification Service using Mailtrap SMTP

interface EmailRecipient {
  email: string;
  name?: string;
}

interface TicketEmailData {
  ticketNumber: string;
  title: string;
  category: string;
  subcategory: string;
  priority: string;
  description: string;
  customerName?: string;
  customerEmail?: string;
  reportedBy: string;
  assignedTo?: string;
  owner?: string;
  createdAt: string;
  estimatedClosure: string;
  tags: string[];
  ticketUrl: string;
}

interface MailtrapConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

class EmailService {
  private config: MailtrapConfig;

  constructor() {
    this.config = {
      host: process.env.REACT_APP_SMTP_HOST || 'sandbox.smtp.mailtrap.io',
      port: parseInt(process.env.REACT_APP_SMTP_PORT || '2525'),
      username: process.env.REACT_APP_SMTP_USERNAME || 'cd2031469d49aa',
      password: process.env.REACT_APP_SMTP_PASSWORD || '33872798dbfba8',
      fromEmail: process.env.REACT_APP_FROM_EMAIL || 'tickets@physique57.com',
      fromName: process.env.REACT_APP_FROM_NAME || 'Physique 57 Tickets',
    };
    
    if (!this.config.username || !this.config.password) {
      console.warn('Mailtrap SMTP: Credentials not configured. Email notifications will be disabled.');
    }
  }

  async sendTicketCreatedNotification(ticketData: TicketEmailData, recipients: EmailRecipient[]): Promise<boolean> {
    try {
      if (!this.config.username || !this.config.password) {
        console.warn('Mailtrap SMTP: Cannot send email - credentials not configured');
        return false;
      }

      const emailContent = this.buildTicketCreatedEmail(ticketData);
      
      // Send email via Mailtrap SMTP API endpoint
      const response = await fetch('https://send.api.mailtrap.io/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': '6f1e4c8b9d3a2f5e7c8d9e1f2a3b4c5d', // Use your actual API token
        },
        body: JSON.stringify({
          from: {
            email: this.config.fromEmail,
            name: this.config.fromName,
          },
          to: recipients.map(recipient => ({
            email: recipient.email,
            name: recipient.name || recipient.email,
          })),
          subject: `🎫 New Ticket #${ticketData.ticketNumber}: ${ticketData.title}`,
          html: emailContent,
          category: 'Ticket Notification',
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Mailtrap SMTP error:', response.status, errorData);
        return false;
      }

      console.log('Email sent successfully via Mailtrap SMTP');
      return true;
    } catch (error) {
      console.error('Email sending error:', error);
      return false;
    }
  }

  private buildTicketCreatedEmail(data: TicketEmailData): string {
    const priorityColors: Record<string, string> = {
      critical: '#EF4444',
      high: '#F59E0B',
      medium: '#3B82F6',
      low: '#6B7280',
    };

    const priorityColor = priorityColors[data.priority.toLowerCase()] || '#3B82F6';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .ticket-number {
      display: inline-block;
      margin-top: 10px;
      padding: 6px 16px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }
    .content {
      padding: 30px 20px;
    }
    .priority-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      color: white;
      background-color: ${priorityColor};
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 20px 0;
    }
    .info-item {
      padding: 15px;
      background: #f9fafb;
      border-radius: 8px;
      border-left: 3px solid #6366F1;
    }
    .info-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .info-value {
      font-size: 14px;
      color: #1f2937;
      font-weight: 500;
    }
    .description-box {
      margin: 20px 0;
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    .description-box h3 {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #6b7280;
      text-transform: uppercase;
      font-weight: 600;
    }
    .description-box p {
      margin: 0;
      color: #1f2937;
      line-height: 1.6;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 20px 0;
    }
    .tag {
      padding: 4px 12px;
      background: #EEF2FF;
      color: #4F46E5;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    .action-button {
      display: inline-block;
      margin: 20px 0;
      padding: 12px 30px;
      background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      text-align: center;
    }
    .footer {
      padding: 20px;
      background: #f9fafb;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎫 New Ticket Created</h1>
      <span class="ticket-number">#${data.ticketNumber}</span>
    </div>
    
    <div class="content">
      <h2 style="margin-top: 0; color: #1f2937;">${data.title}</h2>
      
      <div style="margin: 15px 0;">
        <span class="priority-badge">${data.priority} Priority</span>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Category</div>
          <div class="info-value">${data.category}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Subcategory</div>
          <div class="info-value">${data.subcategory}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Created</div>
          <div class="info-value">${data.createdAt}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Est. Closure</div>
          <div class="info-value">${data.estimatedClosure}</div>
        </div>
        ${data.reportedBy ? `
        <div class="info-item">
          <div class="info-label">Reported By</div>
          <div class="info-value">${data.reportedBy}</div>
        </div>
        ` : ''}
        ${data.assignedTo ? `
        <div class="info-item">
          <div class="info-label">Assigned To</div>
          <div class="info-value">${data.assignedTo}</div>
        </div>
        ` : ''}
        ${data.customerName ? `
        <div class="info-item">
          <div class="info-label">Customer</div>
          <div class="info-value">${data.customerName}</div>
        </div>
        ` : ''}
        ${data.customerEmail ? `
        <div class="info-item">
          <div class="info-label">Customer Email</div>
          <div class="info-value">${data.customerEmail}</div>
        </div>
        ` : ''}
      </div>

      ${data.tags.length > 0 ? `
      <div class="tags">
        ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      ` : ''}

      <div class="description-box">
        <h3>📋 Issue Description</h3>
        <p>${data.description}</p>
      </div>

      <div style="text-align: center;">
        <a href="${data.ticketUrl}" class="action-button">View Ticket Details →</a>
      </div>
    </div>

    <div class="footer">
      <p>This is an automated notification from Physique 57 Ticketing System</p>
      <p style="margin-top: 10px;">
        <a href="${data.ticketUrl}" style="color: #6366F1; text-decoration: none;">View in Dashboard</a>
      </p>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  async sendTicketAssignedNotification(ticketData: TicketEmailData, assignee: EmailRecipient): Promise<boolean> {
    // Implementation for ticket assignment notification
    return true;
  }

  async sendTicketStatusUpdateNotification(ticketData: TicketEmailData, recipients: EmailRecipient[]): Promise<boolean> {
    // Implementation for status update notification
    return true;
  }
}

export const emailService = new EmailService();
