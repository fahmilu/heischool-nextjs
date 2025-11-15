# HEI Schools - Enrollment Email Template System

This document explains how the enrollment form email template system works and how to integrate it with your email service.

## 📁 File Structure

```
src/
├── templates/
│   └── enrollmentEmail.html          # Static HTML template (for reference)
├── utils/
│   ├── emailTemplateGenerator.js     # Main email generator utility
│   └── emailTemplateExample.js       # Usage examples
├── app/
│   └── api/
│       └── enrollment/
│           └── route.js               # API endpoint for form submission
└── components/
    └── Contact/
        └── Tabs/
            └── Enrollment.jsx         # Form component (updated)
```

## 🎯 Features

- ✅ Dynamic email generation with form data
- ✅ Handles multiple contacts (array)
- ✅ Handles multiple children (array)
- ✅ XSS protection with HTML escaping
- ✅ Professional, responsive email design
- ✅ Email-client compatible (uses table layout)
- ✅ Date formatting
- ✅ Ready for email service integration

## 🚀 How It Works

### 1. **Form Submission** (`Enrollment.jsx`)
When a user submits the enrollment form:
- Form data is validated
- Data is sent to `/api/enrollment` endpoint
- Success/error messages are displayed

### 2. **API Processing** (`/api/enrollment/route.js`)
The API endpoint:
- Receives form data
- Generates HTML email using `generateEnrollmentEmail()`
- Sends email via your email service (to be configured)
- Returns success/error response

### 3. **Email Generation** (`emailTemplateGenerator.js`)
The generator:
- Takes form data object
- Dynamically generates contacts and children sections
- Escapes HTML to prevent XSS
- Formats dates properly
- Returns complete HTML email

## 📧 Email Service Integration

You need to configure an email service. Here are the most popular options:

### Option 1: SendGrid (Recommended)

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Add to `.env.local`:
```env
SENDGRID_API_KEY=your_api_key_here
```

3. Update `app/api/enrollment/route.js`:
```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: 'admin@heischools.com',
    from: 'noreply@heischools.com',
    subject: `New School Tour Request - ${formData.location}`,
    html: emailHTML,
};

await sgMail.send(msg);
```

### Option 2: Nodemailer (SMTP)

1. Install Nodemailer:
```bash
npm install nodemailer
```

2. Add to `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

3. Update `app/api/enrollment/route.js`:
```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

await transporter.sendMail({
    from: '"HEI Schools" <noreply@heischools.com>',
    to: 'admin@heischools.com',
    subject: `New School Tour Request - ${formData.location}`,
    html: emailHTML,
});
```

### Option 3: Resend (Modern Email API)

1. Install Resend:
```bash
npm install resend
```

2. Add to `.env.local`:
```env
RESEND_API_KEY=your_api_key_here
```

3. Update `app/api/enrollment/route.js`:
```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
    from: 'HEI Schools <onboarding@resend.dev>',
    to: 'admin@heischools.com',
    subject: `New School Tour Request - ${formData.location}`,
    html: emailHTML,
});
```

## 📝 Email Template Structure

The generated email includes:

1. **Header**
   - HEI Schools branding
   - Title: "School Tour Form Submission"

2. **School Location Section**
   - Selected location

3. **Contact Information Section**
   - Dynamic list of contacts (supports multiple)
   - Parent name, relationship, email, phone, address

4. **Child Information Section**
   - Dynamic list of children (supports multiple)
   - Full name, gender, birthdate, start date, level

5. **Visit Schedule Section**
   - Visit date and time
   - Remarks
   - Enquiry source

6. **Footer**
   - Submission timestamp
   - Copyright notice

## 🎨 Customization

### Change Colors

Edit the color scheme in `emailTemplateGenerator.js`:
- Primary color: `#4EBDD1` (HEI blue)
- Secondary color: `#2a7f8f` (dark teal)
- Background: `#f4f4f4` (light gray)

### Modify Template

To modify the email template, edit the HTML string in `generateEnrollmentEmail()` function in `emailTemplateGenerator.js`.

### Add Logo

To add your logo, host it online and update the header section:
```html
<img src="https://your-domain.com/logo.png" alt="HEI Schools" style="max-width: 200px;">
```

## 🧪 Testing

### Test in Development

The API returns the email HTML in development mode. You can:

1. Submit a test form
2. Check the browser console for the API response
3. Copy the HTML from `emailPreview` field
4. Save it as an `.html` file and open in browser

### Preview in Browser

Navigate to: `/email-preview` (if you create the preview page)

### Send Test Email

Use a test email service like [Mailtrap](https://mailtrap.io/) to test emails without sending to real addresses.

## 🔐 Security

- ✅ All user input is HTML-escaped to prevent XSS attacks
- ✅ Form validation on both client and server side
- ✅ API endpoint uses POST method only
- ⚠️ Add rate limiting to prevent spam (recommended)
- ⚠️ Add authentication if needed

## 📱 Mobile Responsive

The email template is responsive and works well on:
- Desktop email clients (Outlook, Thunderbird)
- Web email (Gmail, Yahoo, Outlook.com)
- Mobile email apps (iOS Mail, Gmail app)

## 🐛 Troubleshooting

### Email not sending
- Check your email service API key/credentials
- Check console for error messages
- Verify `.env.local` variables are loaded

### Email looks broken
- Some email clients don't support modern CSS
- The template uses tables for maximum compatibility
- Test with [Litmus](https://www.litmus.com/) or [Email on Acid](https://www.emailonacid.com/)

### Multiple contacts/children not showing
- Ensure the array is being passed correctly
- Check browser console for errors
- Verify `formData.contacts` and `formData.children` are arrays

## 📚 Additional Resources

- [Email Design Best Practices](https://www.campaignmonitor.com/css/)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [HTML Email Templates Guide](https://webdesign.tutsplus.com/articles/build-an-html-email-template-from-scratch--webdesign-12770)

## 💡 Next Steps

1. Choose and configure an email service
2. Test the email template
3. Customize colors and content if needed
4. Set up email notifications
5. Consider adding:
   - Email confirmation to parents
   - SMS notifications
   - Database storage
   - Admin dashboard

