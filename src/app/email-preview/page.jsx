'use client';
import { useState } from 'react';
import { generateEnrollmentEmail } from '@/utils/emailTemplateGenerator';

/**
 * Email Template Preview Page
 * Navigate to /email-preview to view and test the email template
 */
export default function EmailPreview() {
    // Sample data for preview
    const [previewData] = useState({
        location: 'Senayan',
        visitDate: '2024-12-20',
        visitTime: '09.00 - 10.00',
        remarks: 'Looking forward to visiting the school and learning more about your programs.',
        enquirySource: 'Google',
        contacts: [
            {
                parentName: 'John Smith',
                relationship: 'Parent',
                email: 'john.smith@example.com',
                phoneNumber: '+62 812 3456 7890',
                address: '123 Main Street, South Jakarta, Indonesia 12345'
            },
            {
                parentName: 'Jane Smith',
                relationship: 'Parent',
                email: 'jane.smith@example.com',
                phoneNumber: '+62 813 4567 8901',
                address: '123 Main Street, South Jakarta, Indonesia 12345'
            }
        ],
        children: [
            {
                childFullName: 'Emily Smith',
                gender: 'Female',
                birthdate: '2020-05-15',
                preferedStartDate: '2025-01-15',
                preferedLevel: 'toddler'
            },
            {
                childFullName: 'Michael Smith',
                gender: 'Male',
                birthdate: '2018-09-22',
                preferedStartDate: '2025-01-15',
                preferedLevel: 'kindergarten 1'
            }
        ]
    });

    const [emailHTML, setEmailHTML] = useState('');
    const [showHTML, setShowHTML] = useState(false);

    const generatePreview = () => {
        const html = generateEnrollmentEmail(previewData);
        setEmailHTML(html);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(emailHTML);
        alert('HTML copied to clipboard!');
    };

    const downloadHTML = () => {
        const blob = new Blob([emailHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'enrollment-email-preview.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ 
            padding: '40px', 
            maxWidth: '1200px', 
            margin: '0 auto',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <h1 style={{ 
                fontSize: '32px', 
                marginBottom: '20px',
                color: '#4EBDD1'
            }}>
                📧 Email Template Preview
            </h1>
            
            <div style={{ 
                backgroundColor: '#f0f0f0', 
                padding: '20px', 
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
                    This is a preview of the enrollment email template. Click &quot;Generate Preview&quot; to see how the email will look.
                </p>
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={generatePreview}
                        style={{
                            backgroundColor: '#4EBDD1',
                            color: 'white',
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        Generate Preview
                    </button>
                    
                    {emailHTML && (
                        <>
                            <button
                                onClick={() => setShowHTML(!showHTML)}
                                style={{
                                    backgroundColor: '#666',
                                    color: 'white',
                                    padding: '12px 24px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                {showHTML ? 'Hide' : 'Show'} HTML Code
                            </button>
                            
                            <button
                                onClick={copyToClipboard}
                                style={{
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    padding: '12px 24px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                📋 Copy HTML
                            </button>
                            
                            <button
                                onClick={downloadHTML}
                                style={{
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    padding: '12px 24px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                💾 Download HTML
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* HTML Code View */}
            {showHTML && emailHTML && (
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>HTML Code:</h3>
                    <pre style={{
                        backgroundColor: '#1e1e1e',
                        color: '#d4d4d4',
                        padding: '20px',
                        borderRadius: '8px',
                        overflow: 'auto',
                        fontSize: '12px',
                        lineHeight: '1.5'
                    }}>
                        <code>{emailHTML}</code>
                    </pre>
                </div>
            )}

            {/* Email Preview */}
            {emailHTML && (
                <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Email Preview:</h3>
                    <div style={{
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <div 
                            dangerouslySetInnerHTML={{ __html: emailHTML }}
                            style={{ minHeight: '400px' }}
                        />
                    </div>
                </div>
            )}

            {/* Sample Data Display */}
            <div style={{ 
                marginTop: '40px',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
            }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Sample Form Data:</h3>
                <pre style={{
                    backgroundColor: '#fff',
                    padding: '15px',
                    borderRadius: '4px',
                    overflow: 'auto',
                    fontSize: '12px',
                    border: '1px solid #ddd'
                }}>
                    <code>{JSON.stringify(previewData, null, 2)}</code>
                </pre>
            </div>

            <div style={{
                marginTop: '40px',
                padding: '20px',
                backgroundColor: '#fff3cd',
                borderLeft: '4px solid #ffc107',
                borderRadius: '4px'
            }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>💡 Note:</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>
                    This preview page is for development and testing purposes. The actual email will be sent 
                    from your API endpoint at <code>/api/enrollment</code> using your configured email service.
                </p>
            </div>
        </div>
    );
}

