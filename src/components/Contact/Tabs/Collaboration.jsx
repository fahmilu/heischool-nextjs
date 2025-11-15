'use client';
import { useState } from 'react';
import DropdownSelect from '@/components/DropdownSelect';

const Collaboration = () => {
    const Subjects = [
        'School Tour',
        'Enrollment',
        'Collaboration',
        'Other'
    ];

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
                if (!value.trim()) return 'First name is required';
                if (value.trim().length < 2) return 'First name must be at least 2 characters';
                return '';
            case 'lastName':
                if (!value.trim()) return 'Last name is required';
                if (value.trim().length < 2) return 'Last name must be at least 2 characters';
                return '';
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!validateEmail(value)) return 'Please enter a valid email address';
                return '';
            case 'phoneNumber':
                if (!value.trim()) return 'Phone number is required';
                if (!validatePhoneNumber(value)) return 'Please enter a valid phone number';
                return '';
            case 'subject':
                if (!value) return 'Please select a subject';
                return '';
            case 'message':
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                return '';
            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubjectChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            subject: value
        }));

        if (errors.subject) {
            setErrors((prev) => ({
                ...prev,
                subject: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Mark all fields as touched
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);

        // Validate all fields
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSubmitStatus('error');
            // Scroll to first error
            const firstErrorField = Object.keys(newErrors)[0];
            const errorElement = document.getElementById(firstErrorField);
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                errorElement.focus();
            }
            return;
        }

        // Submit form
        setIsSubmitting(true);
        setSubmitStatus(null);
        console.log('Form Data:', formData);
        // Here you would typically send the data to your API
        console.log('Form submitted:', formData);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                subject: '',
                message: ''
            });
            setErrors({});
            setTouched({});
        }, 1000);
    };

    return (
        <form className="visit-us-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
                <h4>Your Name<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={touched.firstName && errors.firstName ? 'error' : ''}
                        />
                        {touched.firstName && errors.firstName && (
                            <span className="error-message">{errors.firstName}</span>
                        )}
                    </div>
                    <div className="form-col">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={touched.lastName && errors.lastName ? 'error' : ''}
                        />
                        {touched.lastName && errors.lastName && (
                            <span className="error-message">{errors.lastName}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <h4>Email<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col">
                        {/* <label htmlFor="email">Email</label> */}
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={touched.email && errors.email ? 'error' : ''}
                        />
                        {touched.email && errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <h4>Phone Number<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col">
                        {/* <label htmlFor="phoneNumber">Phone Number</label> */}
                        <input 
                            type="tel" 
                            id="phoneNumber" 
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={touched.phoneNumber && errors.phoneNumber ? 'error' : ''}
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                            <span className="error-message">{errors.phoneNumber}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <h4>What do you want to collaborate with us?<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col">
                        <div className="form-col">
                            <DropdownSelect 
                                options={Subjects} 
                                onChange={handleSubjectChange}
                            />
                            {touched.subject && errors.subject && (
                                <span className="error-message">{errors.subject}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <h4>Message<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col form-checkbox-group">
                        <div className="form-col">
                            <textarea 
                                id="message" 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={touched.message && errors.message ? 'error' : ''}
                                rows="5"
                            />
                            {touched.message && errors.message && (
                                <span className="error-message">{errors.message}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {submitStatus === 'success' && (
                <div className="submit-success">
                    <p>✓ Collaboration request submitted successfully! We will contact you soon.</p>
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="submit-error">
                    <p>⚠ Please fill in all required fields correctly.</p>
                </div>
            )}
            <div className="form-group button-group">
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    );
};

export default Collaboration;