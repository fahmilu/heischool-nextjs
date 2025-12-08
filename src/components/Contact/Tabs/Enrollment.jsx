'use client';

import ContactForm from '@/components/Contact/Forms/contact';
import ChildInfoForm from '@/components/Contact/Forms/childInfo';
import EnrollmentSlider from '@/components/EnrollmentSlider';
import { pushData } from '@/services/api';


import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { 
    selectAllLocations, 
  } from '@/redux/slices/locationsSlice';
import DropdownSelect from '@/components/DropdownSelect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Enrollment = () => {

    const locations = useAppSelector(selectAllLocations);
    const locationArray = locations.map((location) => location.label);

    const relations = [
        'Grandmother',
        'Uncle',
        'Aunty',
        'Agent',
        'Guardian',
        'Family Friend',
        'Parent\'s Employee',
    ];

    const genders = [
        'Male',
        'Female',
    ];

    const prevered_level = [
        'toddler',
        'nursery',
        'pre k',
        'kindergarten 1',
        'kindergarten 2',
    ];

    const visit_times = [
        '09.00 - 10.00',
        '10.00 - 11.00',
        '11.00 - 12.00'
    ]

    const enqus = [
        'Walk in',
        'Call',
        'Referral',
        'Facebook marketing',
        'Google',
        'Family / Friends',
        'School Website',
        'HUBSPOT',
        'ECDA',
        'Other'
    ]



    const [contacts, setContacts] = useState([
        {
            parent_name: '',
            relationship: '',
            email: '',
            phone: '',
            address: ''
        }
    ]);

    const [children, setChildren] = useState([
        {
            name: '',
            gender: '',
            birth_date: '',
            prefered_start_date: '',
            prevered_level: ''
        }
    ]);

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const [formData, setFormData] = useState({
        location: '',
        visit_date: null,
        visit_time: '',
        remarks: '',
        enquiry_source: '',
    });

    const validateField = (name, value) => {
        switch (name) {
            case 'parent_name':
                return value.trim() === '' ? 'Parent name is required' : '';
            case 'relationship':
                return value.trim() === '' ? 'Relationship is required' : '';
            case 'email':
                if (value.trim() === '') return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(value) ? 'Invalid email format' : '';
            case 'phone':
                if (value.trim() === '') return 'Phone number is required';
                const phoneRegex = /^[0-9+\-\s()]+$/;
                return !phoneRegex.test(value) ? 'Invalid phone number format' : '';
            case 'address':
                return value.trim() === '' ? 'Address is required' : '';
            case 'location':
                return value.trim() === '' ? 'Location is required' : '';
            case 'name':
                return value.trim() === '' ? 'Child full name is required' : '';
            case 'gender':
                return value.trim() === '' ? 'Gender is required' : '';
            case 'birth_date':
                return value.trim() === '' ? 'Birth_date is required' : '';
            case 'prefered_start_date':
                return value.trim() === '' ? 'Preferred start date is required' : '';
            case 'prevered_level':
                return value.trim() === '' ? 'Preferred level is required' : '';
            case 'visit_date':
                if (!value) return 'Visit date is required';
                const selectedDate = value instanceof Date ? value : new Date(value);
                const dayOfWeek = selectedDate.getDay();
                // 0 = Sunday, 6 = Saturday
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    return 'Please select a weekday (Monday-Friday)';
                }
                return '';
            case 'visit_time':
                return value.trim() === '' ? 'Visit time is required' : '';
            case 'enqu':
                return value.trim() === '' ? 'Enquiry source is required' : '';
            default:
                return '';
        }
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newContacts = [...contacts];
        newContacts[index] = { ...newContacts[index], [name]: value };
        setContacts(newContacts);

        // Validate field on change
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [`${name}_${index}`]: error
        }));
    };

    const handleChildChange = (index, e) => {
        const { name, value } = e.target;
        const newChildren = [...children];
        newChildren[index] = { ...newChildren[index], [name]: value };
        setChildren(newChildren);

        // Validate field on change
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [`${name}_${index}`]: error
        }));
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate field on change
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleBlur = (index, e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [`${name}_${index}`]: true }));
    };

    const handleVisit_timeChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEnquChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleVisit_dateChange = (date) => {
        setFormData({ ...formData, visit_date: date });
        
        // Validate field on change
        const error = validateField('visit_date', date);
        setErrors(prev => ({
            ...prev,
            visit_date: error
        }));
        setTouched(prev => ({
            ...prev,
            visit_date: true
        }));
    };

    const handleRemarksChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addContact = () => {
        setContacts([...contacts, {
            parent_name: '',
            relationship: '',
            email: '',
            phone: '',
            address: ''
        }]);
    };

    const removeContact = (index) => {
        if (contacts.length > 1) {
            const newContacts = contacts.filter((_, i) => i !== index);
            setContacts(newContacts);
            
            // Clean up errors and touched for removed contact
            const newErrors = { ...errors };
            const newTouched = { ...touched };
            Object.keys(newErrors).forEach(key => {
                if (key.endsWith(`_${index}`)) {
                    delete newErrors[key];
                }
            });
            Object.keys(newTouched).forEach(key => {
                if (key.endsWith(`_${index}`)) {
                    delete newTouched[key];
                }
            });
            setErrors(newErrors);
            setTouched(newTouched);
        }
    };

    const addChild = () => {
        setChildren([...children, {
            name: '',
            gender: '',
            birth_date: '',
            prefered_start_date: '',
            prevered_level: ''
        }]);
    };

    const removeChild = (index) => {
        if (children.length > 1) {
            const newChildren = children.filter((_, i) => i !== index);
            setChildren(newChildren);
            
            // Clean up errors and touched for removed child
            const newErrors = { ...errors };
            const newTouched = { ...touched };
            Object.keys(newErrors).forEach(key => {
                if (key.endsWith(`_${index}`)) {
                    delete newErrors[key];
                }
            });
            Object.keys(newTouched).forEach(key => {
                if (key.endsWith(`_${index}`)) {
                    delete newTouched[key];
                }
            });
            setErrors(newErrors);
            setTouched(newTouched);
        }
    };

    const validateAllContacts = () => {
        let newErrors = {};
        let newTouched = {};
        let isValid = true;

        contacts.forEach((contact, index) => {
            // Validate each field for each contact
            Object.keys(contact).forEach(fieldName => {
                const error = validateField(fieldName, contact[fieldName]);
                const errorKey = `${fieldName}_${index}`;
                
                if (error) {
                    newErrors[errorKey] = error;
                    isValid = false;
                }
                
                // Mark all fields as touched
                newTouched[errorKey] = true;
            });
        });

        setErrors(newErrors);
        setTouched(newTouched);
        return isValid;
    };

    const validateAllChildren = () => {
        let newErrors = {};
        let newTouched = {};
        let isValid = true;

        children.forEach((child, index) => {
            // Validate each field for each child
            Object.keys(child).forEach(fieldName => {
                const error = validateField(fieldName, child[fieldName]);
                const errorKey = `${fieldName}_${index}`;
                
                if (error) {
                    newErrors[errorKey] = error;
                    isValid = false;
                }
                
                // Mark all fields as touched
                newTouched[errorKey] = true;
            });
        });

        setErrors(prev => ({ ...prev, ...newErrors }));
        setTouched(prev => ({ ...prev, ...newTouched }));
        return isValid;
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(errors => ({ ...errors, ...newErrors }));
        setTouched(touched => ({ ...touched, ...newErrors }));
        return newErrors;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset submit status
        setSubmitStatus(null);
        setIsSubmitting(true);
        // Validate all contacts and children
        const isContactsValid = validateAllContacts();
        const isChildrenValid = validateAllChildren();
        const newErrors = validateForm();
        if (!isContactsValid || !isChildrenValid || Object.keys(newErrors).length > 0) {
            setSubmitStatus('error');
            // Scroll to first error
            setTimeout(() => {
                const firstError = document.querySelector('.error-message');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                setIsSubmitting(false);
            }, 100);
            return;
        } else {
            try {
                // Format the date for submission (timezone-safe)
                const formatDate = (date) => {
                    if (!date) return '';
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                };
                
                const submissionData = {
                    ...formData,
                    visit_date: formatDate(formData.visit_date),
                    contacts: contacts,
                    child_informations: children,
                    location_id: locations.find(location => location.label === formData.location)?.id
                };
                
                pushData('enrollment-submissions', submissionData).then((data) => {
                    // console.log(data);
                            // Log the data for now
                    // console.log('Enrollment Form Submitted:', result);
    
                    // Set success status
                    setSubmitStatus('success');
    
                    // Optional: Reset form after successful submission
                    setContacts([{
                        parent_name: '',
                        relationship: '',
                        email: '',
                        phone: '',
                        address: ''
                    }]);
                    setChildren([{
                        name: '',
                        gender: '',
                        birth_date: '',
                        prefered_start_date: '',
                        prevered_level: ''
                    }]);
                    setErrors({});
                    setTouched({});
                    setFormData({
                        location: '',
                        visit_date: null,
                        visit_time: '',
                        remarks: '',
                        enqu: ''
                    });
                    // Scroll to success message
                    setTimeout(() => {
                        const successMessage = document.querySelector('.submit-success');
                        if (successMessage) {
                            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 100);
                    
                    setTimeout(() => {
                        setSubmitStatus(null);
                    }, 10000);
                }).catch((error) => {
                    console.log(error);
                });
    
    
            } catch (error) {
                console.error('Submission error:', error);
                setSubmitStatus('error');
            } finally {
                setIsSubmitting(false);
            }
        }


    };

    return (
        <div className="enrollment">
            <EnrollmentSlider />
            {/* <div className="enrollment-form">
                <iframe src="https://forms.littlelives.com/interest-form/123607-hei-schools-senayan?lang=eng&embed=true" width="100%" height="100%" frameBorder={0} marginHeight={0} marginWidth={0}>Loading…</iframe>
            </div> */}
            <h2 className="text-center text-hei-green py-10">SCHOOL TOUR FORM</h2>
            <form className="enrollment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <h4>School Location<small>(Required)</small></h4>
                    <div className="form-row">
                        <div className="form-col">
                            <DropdownSelect options={locationArray} value={formData.location} name="location" onChange={handleLocationChange} />
                            {touched.location && errors.location && (
                                <span className="error-message">{errors.location}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <h4>Contact<small>(Required)</small></h4>
                </div>
                {contacts.map((contact, index) => (
                    <div key={index} className="contact-form-wrapper">
                        {contacts.length > 1 && (
                            <div className="contact-form-header">
                                <h5>Contact {index + 1}</h5>
                                <button
                                    type="button"
                                    onClick={() => removeContact(index)}
                                    className="remove-contact-btn"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                        <ContactForm 
                            index={index}
                            relations={relations} 
                            handleChange={handleChange} 
                            handleBlur={handleBlur} 
                            touched={touched} 
                            errors={errors} 
                            formData={contact} 
                        />
                    </div>
                ))}
                <button 
                    type="button" 
                    onClick={addContact}
                    className="add-contact-btn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <circle cx={12} cy={12} r={12} fill="#4EBDD1" />
                    <rect x="5.45312" y="11.0911" width="13.0909" height="1.81818" rx="0.909091" fill="#D9D9D9" />
                    <rect x="11.0898" y="18.5454" width="13.0909" height="1.81818" rx="0.909091" transform="rotate(-90 11.0898 18.5454)" fill="#D9D9D9" />
                    </svg>
                    <span>Add Another Contact</span>
                </button>

                <div className="form-group !mt-[74px]">
                    <h4>Child Information<small>(Required)</small></h4>
                </div>
                {children.map((child, index) => (
                    <div key={index} className="contact-form-wrapper">
                        {children.length > 1 && (
                            <div className="contact-form-header">
                                <h5>Child {index + 1}</h5>
                                <button
                                    type="button"
                                    onClick={() => removeChild(index)}
                                    className="remove-contact-btn"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                        <ChildInfoForm 
                            index={index}
                            genders={genders}
                            prevered_level={prevered_level}
                            handleChange={handleChildChange}
                            handleBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                            formData={child}
                        />
                    </div>
                ))}
                <button 
                    type="button" 
                    onClick={addChild}
                    className="add-contact-btn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <circle cx={12} cy={12} r={12} fill="#4EBDD1" />
                    <rect x="5.45312" y="11.0911" width="13.0909" height="1.81818" rx="0.909091" fill="#D9D9D9" />
                    <rect x="11.0898" y="18.5454" width="13.0909" height="1.81818" rx="0.909091" transform="rotate(-90 11.0898 18.5454)" fill="#D9D9D9" />
                    </svg>
                    <span>Add Another Child</span>
                </button>
                <div className="form-group !mt-[74px]">
                    <h4>Schedule a Visit</h4>
                    <div className="form-row">
                        <div className="form-col">
                            <label htmlFor="visit-date">Visit Date*</label>
                            <DatePicker
                                selected={formData.visit_date}
                                onChange={handleVisit_dateChange}
                                minDate={new Date()}
                                filterDate={(date) => {
                                    const day = date.getDay();
                                    // Disable weekends (0 = Sunday, 6 = Saturday)
                                    return day !== 0 && day !== 6;
                                }}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select a weekday"
                                className="w-full"
                                id="visit_date"
                            />
                            {touched.visit_date && errors.visit_date && (
                                <span className="error-message">{errors.visit_date}</span>
                            )}
                        </div>
                        <div className="form-col">
                            <label htmlFor="visit-time">Visit Time*</label>
                            <DropdownSelect value={formData.visit_time} options={visit_times} name="visit_time" onChange={handleVisit_timeChange} />
                            {touched.visit_time && errors.visit_time && (
                                <span className="error-message">{errors.visit_time}</span>
                            )}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-col">
                            <label htmlFor="remarks">Remarks</label>
                            <textarea id="remarks" name="remarks" value={formData.remarks} onChange={handleRemarksChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-col">
                            <label htmlFor="enquiry-source">Enquiry Source*</label>
                            <DropdownSelect value={formData.enqu} options={enqus} name="enqu" onChange={handleEnquChange} />
                            {touched.enqu && errors.enqu && (
                                <span className="error-message">{errors.enqu}</span>
                            )}
                        </div>
                    </div>
                </div>
                {/* Status Messages */}
                {submitStatus === 'success' && (
                    <div className="submit-success">
                        <p>✓ Enrollment form submitted successfully! We will contact you soon.</p>
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
        </div>
    );
}

export default Enrollment;