/**
 * Generates HTML email content from enrollment form data
 * @param {Object} formData - The enrollment form data
 * @returns {string} - Complete HTML email content
 */
export function generateEnrollmentEmail(formData) {
    const { location, visitDate, visitTime, remarks, enquirySource, contacts, children } = formData;
    
    // Generate contacts HTML
    const contactsHTML = contacts.map((contact, index) => `
        <div class="contact-item">
            <div class="item-number">Contact ${index + 1}</div>
            <table class="info-table">
                <tr>
                    <td class="info-label">Parent Name:</td>
                    <td class="info-value">${escapeHtml(contact.parentName)}</td>
                </tr>
                <tr>
                    <td class="info-label">Relationship:</td>
                    <td class="info-value">${escapeHtml(contact.relationship)}</td>
                </tr>
                <tr>
                    <td class="info-label">Email:</td>
                    <td class="info-value"><a href="mailto:${escapeHtml(contact.email)}" style="color: #4EBDD1;">${escapeHtml(contact.email)}</a></td>
                </tr>
                <tr>
                    <td class="info-label">Phone Number:</td>
                    <td class="info-value"><a href="tel:${escapeHtml(contact.phoneNumber)}" style="color: #4EBDD1;">${escapeHtml(contact.phoneNumber)}</a></td>
                </tr>
                <tr>
                    <td class="info-label">Address:</td>
                    <td class="info-value">${escapeHtml(contact.address)}</td>
                </tr>
            </table>
        </div>
    `).join('');

    // Generate children HTML
    const childrenHTML = children.map((child, index) => `
        <div class="child-item">
            <div class="item-number">Child ${index + 1}</div>
            <table class="info-table">
                <tr>
                    <td class="info-label">Full Name:</td>
                    <td class="info-value">${escapeHtml(child.childFullName)}</td>
                </tr>
                <tr>
                    <td class="info-label">Gender:</td>
                    <td class="info-value">${escapeHtml(child.gender)}</td>
                </tr>
                <tr>
                    <td class="info-label">Birth Date:</td>
                    <td class="info-value">${formatDate(child.birthdate)}</td>
                </tr>
                <tr>
                    <td class="info-label">Preferred Start Date:</td>
                    <td class="info-value">${formatDate(child.preferedStartDate)}</td>
                </tr>
                <tr>
                    <td class="info-label">Preferred Level:</td>
                    <td class="info-value">${escapeHtml(child.preferedLevel)}</td>
                </tr>
            </table>
        </div>
    `).join('');

    // Get current date and time
    const submissionDate = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Build complete HTML email
    const htmlEmail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HEI Schools - School Tour Form Submission</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background-color: #4EBDD1;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 30px 20px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            background-color: #2a7f8f;
            color: #ffffff;
            padding: 12px 15px;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .info-table td {
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
        }
        .info-label {
            font-weight: bold;
            color: #333333;
            width: 40%;
            vertical-align: top;
        }
        .info-value {
            color: #666666;
        }
        .contact-item, .child-item {
            background-color: #f9f9f9;
            padding: 15px;
            margin-bottom: 15px;
            border-left: 4px solid #4EBDD1;
        }
        .item-number {
            color: #4EBDD1;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .footer {
            background-color: #333333;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer p {
            margin: 5px 0;
        }
        .divider {
            height: 2px;
            background-color: #4EBDD1;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0">
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <h1>🎓 HEI Schools</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">School Tour Form Submission</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td class="content">
                            <p style="color: #333333; font-size: 14px; line-height: 1.6;">
                                You have received a new school tour form submission. Below are the details:
                            </p>

                            <div class="divider"></div>

                            <!-- School Location Section -->
                            <div class="section">
                                <div class="section-title">📍 School Location</div>
                                <table class="info-table">
                                    <tr>
                                        <td class="info-label">Location:</td>
                                        <td class="info-value">${escapeHtml(location)}</td>
                                    </tr>
                                </table>
                            </div>

                            <!-- Contact Information Section -->
                            <div class="section">
                                <div class="section-title">👤 Contact Information</div>
                                ${contactsHTML}
                            </div>

                            <!-- Child Information Section -->
                            <div class="section">
                                <div class="section-title">👶 Child Information</div>
                                ${childrenHTML}
                            </div>

                            <!-- Visit Schedule Section -->
                            <div class="section">
                                <div class="section-title">📅 Schedule a Visit</div>
                                <table class="info-table">
                                    <tr>
                                        <td class="info-label">Visit Date:</td>
                                        <td class="info-value">${formatDate(visitDate)}</td>
                                    </tr>
                                    <tr>
                                        <td class="info-label">Visit Time:</td>
                                        <td class="info-value">${escapeHtml(visitTime)}</td>
                                    </tr>
                                    <tr>
                                        <td class="info-label">Remarks:</td>
                                        <td class="info-value">${escapeHtml(remarks) || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td class="info-label">Enquiry Source:</td>
                                        <td class="info-value">${escapeHtml(enquirySource)}</td>
                                    </tr>
                                </table>
                            </div>

                            <div class="divider"></div>

                            <p style="color: #666666; font-size: 12px; font-style: italic; margin-top: 20px;">
                                Submitted on: ${submissionDate}
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <p><strong>HEI Schools</strong></p>
                            <p>This is an automated notification from your School Tour Form system.</p>
                            <p>&copy; 2024 HEI Schools. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    return htmlEmail;
}

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.toString().replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Format date string to readable format
 * @param {string} dateString - Date string from input
 * @returns {string} - Formatted date
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
}

