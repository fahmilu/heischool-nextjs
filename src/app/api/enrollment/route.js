import { NextResponse } from 'next/server';
import { generateEnrollmentEmail } from '@/utils/emailTemplateGenerator';

/**
 * POST /api/enrollment
 * Handles enrollment form submission
 */
export async function POST(request) {
    try {
        // Parse the request body
        const formData = await request.json();
        
        // Validate required fields
        if (!formData.location || !formData.contacts || !formData.children) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }
        
        // Generate email HTML
        const emailHTML = generateEnrollmentEmail(formData);
        
        // TODO: Send email using your preferred email service
        // Example with SendGrid:
        /*
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        const msg = {
            to: 'admin@heischools.com',
            from: 'noreply@heischools.com',
            subject: `New School Tour Request - ${formData.location}`,
            html: emailHTML,
        };
        
        await sgMail.send(msg);
        */
        
        // Example with Nodemailer:
        /*
        const nodemailer = require('nodemailer');
        
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
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
        */
        
        // For now, just log the data and return success
        // console.log('Enrollment form received:', {
        //     location: formData.location,
        //     contactsCount: formData.contacts.length,
        //     childrenCount: formData.children.length,
        //     visitDate: formData.visitDate
        // });
        
        // Optional: Store in database
        // await db.enrollment.create({ data: formData });
        
        return NextResponse.json({
            success: true,
            message: 'Enrollment form submitted successfully',
            emailPreview: process.env.NODE_ENV === 'development' ? emailHTML : undefined
        });
        
    } catch (error) {
        console.error('Error processing enrollment:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to process enrollment form',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

