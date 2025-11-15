# 🚀 Quick Start: Enrollment Email System

## What Was Created

✅ **Email Template Generator** (`src/utils/emailTemplateGenerator.js`)
- Dynamically generates HTML emails from form data
- Handles multiple contacts and children
- Includes XSS protection and date formatting

✅ **API Endpoint** (`src/app/api/enrollment/route.js`)
- Receives form submissions at `/api/enrollment`
- Generates email HTML
- Ready for email service integration

✅ **Updated Enrollment Form** (`src/components/Contact/Tabs/Enrollment.jsx`)
- Now sends data to API endpoint
- Handles success/error responses

✅ **Email Preview Page** (`src/app/email-preview/page.jsx`)
- Preview the email template at `/email-preview`
- Test with sample data
- Copy or download HTML

✅ **Documentation** (`EMAIL_TEMPLATE_README.md`)
- Complete setup guide
- Email service integration examples
- Customization tips

## 🎯 Next Steps

### 1. Preview the Email Template

Visit `http://localhost:3000/email-preview` and click "Generate Preview" to see how the email looks.

### 2. Choose an Email Service

Pick one of these options:

**Option A: SendGrid** (Easiest)
```bash
npm install @sendgrid/mail
```

**Option B: Nodemailer** (Most flexible)
```bash
npm install nodemailer
```

**Option C: Resend** (Modern)
```bash
npm install resend
```

### 3. Configure Environment Variables

Create or update `.env.local`:

```env
# For SendGrid
SENDGRID_API_KEY=your_key_here

# OR for Nodemailer/SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# OR for Resend
RESEND_API_KEY=your_key_here
```

### 4. Update the API Route

Open `src/app/api/enrollment/route.js` and uncomment the email service code you chose (lines are marked with TODO comments).

### 5. Test the System

1. Go to `/contact-us` on your site
2. Click "Enrollment" tab
3. Fill out the form with test data
4. Submit and check if email is received

## 📧 Email Template Features

The generated email includes:

| Section | Content |
|---------|---------|
| **Header** | HEI Schools branding |
| **Location** | Selected school location |
| **Contacts** | All parent/guardian contacts (dynamic) |
| **Children** | All children information (dynamic) |
| **Visit Schedule** | Date, time, remarks, enquiry source |
| **Footer** | Timestamp and branding |

## 🎨 Customization

### Change Email Colors

Edit `src/utils/emailTemplateGenerator.js`, find these lines:

```javascript
background-color: #4EBDD1;  // Primary color
background-color: #2a7f8f;  // Section headers
```

### Change Recipient Email

Edit `src/app/api/enrollment/route.js`:

```javascript
to: 'your-admin-email@heischools.com',  // Change this
```

### Add Your Logo

In `emailTemplateGenerator.js`, find the header section and add:

```html
<img src="https://yourdomain.com/logo.png" alt="HEI Schools" style="max-width: 150px; margin-bottom: 10px;">
```

## 🧪 Testing Without Real Email Service

For testing without sending real emails, use [Mailtrap.io](https://mailtrap.io/):

1. Sign up for free account
2. Get SMTP credentials
3. Use with Nodemailer:

```javascript
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "your_mailtrap_user",
        pass: "your_mailtrap_pass"
    }
});
```

## 📱 Test on Real Devices

After sending a test email:
- Check on desktop email clients (Outlook, Thunderbird)
- Check webmail (Gmail, Yahoo)
- Check mobile apps (iOS Mail, Android Gmail)

## 🐛 Common Issues

### "Email not sending"
- Check your API key/credentials
- Check console for errors
- Verify environment variables are loaded

### "Form submits but no email"
- Make sure you uncommented the email service code
- Check API route console logs
- Test with email preview first

### "Email looks broken"
- The template is designed for email clients
- Some CSS may not work in all clients
- Test with popular email services

## 📞 Support

For detailed documentation, see `EMAIL_TEMPLATE_README.md`

## ✅ Checklist

- [ ] Previewed email template at `/email-preview`
- [ ] Installed email service package
- [ ] Added environment variables
- [ ] Updated API route with email service code
- [ ] Tested form submission
- [ ] Received test email
- [ ] Verified email looks correct on different clients
- [ ] Customized colors/branding (optional)
- [ ] Added company logo (optional)

---

**Ready to go!** Once you complete these steps, your enrollment form will automatically send beautifully formatted emails with all the submission details.

