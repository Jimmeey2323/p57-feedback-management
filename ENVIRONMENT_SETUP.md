# ⚠️ IMPORTANT: Environment Variables Setup

## Current Status
Phase 1 is deployed but **AI features will not work** until you add the environment variables in Vercel.

## Steps to Enable All Features

### 1. Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project: `p57-feedback-management`
3. Go to **Settings** → **Environment Variables**

### 2. Add These Variables

#### Momence API (Customer Search)
```
REACT_APP_MOMENCE_API_BASE_URL = https://api.momence.com/api/v2
REACT_APP_MOMENCE_AUTH_TOKEN = YXBpLTEzNzUyLUtYRTBPRFVQR3BTdkVrR1E6dlpPWkRGSHk0dEtOeWYzOHpvZ0JtQnRZSElSaTJldVo=
REACT_APP_MOMENCE_USERNAME = physique57mumbai1@gmail.com
REACT_APP_MOMENCE_PASSWORD = Jimmeey@123
```

#### OpenAI API (Auto-Tagging & Priority Suggestions)
```
REACT_APP_OPENAI_API_KEY = sk-proj-...your-key...
```
**Get your key at**: https://platform.openai.com/api-keys

#### Mailtrap API (Email Notifications)
```
REACT_APP_MAILTRAP_API_TOKEN = a3194c911caceef1b76b500e5c8fe989
REACT_APP_FROM_EMAIL = hello@demomailtrap.co
REACT_APP_FROM_NAME = Physique 57 Tickets
REACT_APP_NOTIFY_EMAIL = jimmeey@physique57india.com
```
**Get your token at**: https://mailtrap.io/api-tokens

### 3. Redeploy
After adding variables, click **"Redeploy"** in Vercel dashboard or just push a new commit.

---

## What Works WITHOUT Environment Variables

✅ All form fields and validation  
✅ Category and subcategory selection  
✅ Ticket creation and saving to database  
✅ Manual customer entry  
✅ Dynamic form fields  
✅ Priority selection  

## What WON'T Work Without Variables

❌ Customer search (Momence API)  
❌ AI auto-tagging (OpenAI)  
❌ AI priority suggestions (OpenAI)  
❌ Email notifications (Mailtrap API)  

**Note**: The form will still work perfectly, just without these advanced features. They fail gracefully with console errors only.

---

## Testing After Setup

1. Create a new ticket
2. Enter a description and blur the field → should see "AI analysis complete"
3. Look for suggested tags below description
4. Check if AI suggests different priority
5. Try searching for a customer name
6. Submit ticket → check email for notification

---

## Need Help Getting API Keys?

### OpenAI
1. Go to https://platform.openai.com/signup
2. Add payment method (pay-as-you-go)
3. Create API key
4. Cost: ~$0.002 per ticket analysis (very cheap)

### Mailtrap
Already have token extracted from your request!

---

## Alternative: Local Development

If you want to test with API keys locally first:

1. Create `.env` file in `physique57-tickets/` folder
2. Add all variables from `.env.example`
3. Fill in your API keys
4. Run `npm start`
5. Test on localhost:3000

Then add to Vercel when satisfied!
