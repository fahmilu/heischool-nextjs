import { generateEnrollmentEmail } from './emailTemplateGenerator';

/**
 * Example usage of the email template generator
 * This shows how to integrate with the Enrollment form submission
 */

// Example form data structure
const exampleFormData = {
    location: 'Senayan',
    visitDate: '2024-12-15',
    visitTime: '09.00 - 10.00',
    remarks: 'Looking forward to visiting the school and learning more about the curriculum.',
    enquirySource: 'Google',
    contacts: [
        {
            parentName: 'John Doe',
            relationship: 'Parent',
            email: 'john.doe@example.com',
            phoneNumber: '+62 812 3456 7890',
            address: '123 Main Street, Jakarta, Indonesia'
        },
        {
            parentName: 'Jane Doe',
            relationship: 'Parent',
            email: 'jane.doe@example.com',
            phoneNumber: '+62 813 4567 8901',
            address: '123 Main Street, Jakarta, Indonesia'
        }
    ],
    children: [
        {
            childFullName: 'Alice Doe',
            gender: 'Female',
            birthdate: '2020-03-15',
            preferedStartDate: '2025-01-15',
            preferedLevel: 'toddler'
        },
        {
            childFullName: 'Bob Doe',
            gender: 'Male',
            birthdate: '2018-08-22',
            preferedStartDate: '2025-01-15',
            preferedLevel: 'kindergarten 1'
        }
    ]
};

// Generate the email HTML
const emailHTML = generateEnrollmentEmail(exampleFormData);

// Log or send the email

/**
 * Example API endpoint handler (Next.js API route)
 * File: app/api/enrollment/route.js
 */
export async function exampleAPIHandler(request) {
    try {
        const formData = await request.json();
        
        // Generate email HTML
        const emailHTML = generateEnrollmentEmail(formData);
        
        // Send email using your preferred email service (e.g., SendGrid, Nodemailer, etc.)
        // Example with conceptual email service:
        /*
        await sendEmail({
            to: 'admin@heischools.com',
            from: 'noreply@heischools.com',
            subject: `New School Tour Request - ${formData.location}`,
            html: emailHTML
        });
        */
        
        // Also send confirmation email to parent
        /*
        await sendEmail({
            to: formData.contacts[0].email,
            from: 'noreply@heischools.com',
            subject: 'Thank you for your interest in HEI Schools',
            html: generateConfirmationEmail(formData)
        });
        */
        
        return {
            success: true,
            message: 'Enrollment form submitted successfully'
        };
    } catch (error) {
        console.error('Error processing enrollment:', error);
        return {
            success: false,
            message: 'Failed to process enrollment form'
        };
    }
}

/**
 * Integration with Enrollment.jsx handleSubmit function
 * 
 * Replace the simulated API call in Enrollment.jsx (line 377-378) with:
 * 
 * ```javascript
 * const response = await fetch('/api/enrollment', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(formData)
 * });
 * 
 * if (!response.ok) {
 *     throw new Error('Failed to submit form');
 * }
 * 
 * const result = await response.json();
 * ```
 */

