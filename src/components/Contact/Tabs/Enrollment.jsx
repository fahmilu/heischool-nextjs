'use client';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Arrows } from '@/components/Gallery/Arrows';
import DynamicIframeContainer from '@/components/DynamicIframeContainer';
import ContactForm from '@/components/Contact/Forms/contact';
import ChildInfoForm from '@/components/Contact/Forms/childInfo';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { 
    selectAllLocations, 
  } from '@/redux/slices/locationsSlice';
import DropdownSelect from '@/components/DropdownSelect';
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

    const preferedLevel = [
        'toddler',
        'nursery',
        'pre k',
        'kindergarten 1',
        'kindergarten 2',
    ];

    const visitTimes = [
        '09.00 - 10.00',
        '10.00 - 11.00',
        '11.00 - 12.00'
    ]

    const enquirySources = [
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
    const slides = [
        `/imgs/enroll/1.jpg`,
        `/imgs/enroll/2.jpg`,
        `/imgs/enroll/3.jpg`,
        `/imgs/enroll/4.jpg`,
        `/imgs/enroll/5.jpg`,
        `/imgs/enroll/6.jpg`,
    ]

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
    });

    const [contacts, setContacts] = useState([
        {
            parentName: '',
            relationship: '',
            email: '',
            phoneNumber: '',
            address: ''
        }
    ]);

    const [children, setChildren] = useState([
        {
            childFullName: '',
            gender: '',
            birthdate: '',
            preferedStartDate: '',
            preferedLevel: ''
        }
    ]);

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const [formData, setFormData] = useState({
        location: '',
    });

    const validateField = (name, value) => {
        switch (name) {
            case 'parentName':
                return value.trim() === '' ? 'Parent name is required' : '';
            case 'relationship':
                return value.trim() === '' ? 'Relationship is required' : '';
            case 'email':
                if (value.trim() === '') return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(value) ? 'Invalid email format' : '';
            case 'phoneNumber':
                if (value.trim() === '') return 'Phone number is required';
                const phoneRegex = /^[0-9+\-\s()]+$/;
                return !phoneRegex.test(value) ? 'Invalid phone number format' : '';
            case 'address':
                return value.trim() === '' ? 'Address is required' : '';
            case 'location':
                return value.trim() === '' ? 'Location is required' : '';
            case 'childFullName':
                return value.trim() === '' ? 'Child full name is required' : '';
            case 'gender':
                return value.trim() === '' ? 'Gender is required' : '';
            case 'birthdate':
                return value.trim() === '' ? 'Birthdate is required' : '';
            case 'preferedStartDate':
                return value.trim() === '' ? 'Preferred start date is required' : '';
            case 'preferedLevel':
                return value.trim() === '' ? 'Preferred level is required' : '';
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

    const addContact = () => {
        setContacts([...contacts, {
            parentName: '',
            relationship: '',
            email: '',
            phoneNumber: '',
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
            childFullName: '',
            gender: '',
            birthdate: '',
            preferedStartDate: '',
            preferedLevel: ''
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
        return Object.keys(newErrors).length > 0;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset submit status
        setSubmitStatus(null);

        // Validate all contacts and children
        const isContactsValid = validateAllContacts();
        const isChildrenValid = validateAllChildren();
        const newErrors = validateForm();
        console.log(newErrors);
        if (!isContactsValid || !isChildrenValid || Object.keys(newErrors).length > 0) {
            setSubmitStatus('error');
            // Scroll to first error
            setTimeout(() => {
                const firstError = document.querySelector('.error-message');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            return;
        }

        setIsSubmitting(true);

        try {
            // Here you would typically send the data to your API
            // Example API call:
            // const response = await fetch('/api/enrollment', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ contacts, children })
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Log the data for now
            console.log('Enrollment Form Submitted:', { contacts, children });

            // Set success status
            setSubmitStatus('success');

            // Optional: Reset form after successful submission
            // setContacts([{
            //     parentName: '',
            //     relationship: '',
            //     email: '',
            //     phoneNumber: '',
            //     address: ''
            // }]);
            // setChildren([{
            //     childFullName: '',
            //     gender: '',
            //     birthdate: '',
            //     preferedStartDate: '',
            //     preferedLevel: ''
            // }]);
            // setErrors({});
            // setTouched({});

            // Scroll to success message
            setTimeout(() => {
                const successMessage = document.querySelector('.submit-success');
                if (successMessage) {
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);

        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="enrollment">
            <div className="enrollment-slides">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        {slides.map((slide, index) => (
                            <div key={index} className="enrollment-slide embla__slide aspect-[1500/724] relative">
                                <Image src={slide} alt="Enrollment" fill />
                            </div>
                        ))}
                    </div>
                </div>
                <Arrows emblaApi={emblaApi} />
            </div>
            <div className="enrollment-note">Enrollment is subject to the availability of places within HEI Schools. Once HEI Schools reserves a place for a student and offers enrollment, it is then subject to payment of the first invoice. Failure to pay the first invoice within the specified date may result in losing the reserved place in HEI Schools.</div>
            {/* <div className="enrollment-form">
                <iframe src="https://forms.littlelives.com/interest-form/123607-hei-schools-senayan?lang=eng&embed=true" width="100%" height="100%" frameBorder={0} marginHeight={0} marginWidth={0}>Loading…</iframe>
            </div> */}
            <h2 className="text-center text-hei-green py-10">SCHOOL TOUR FORM</h2>
            <form className="enrollment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <h4>School Location<small>(Required)</small></h4>
                    <div className="form-row">
                        <div className="form-col">
                            <DropdownSelect options={locationArray} name="location" onChange={handleLocationChange} />
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

                <div className="form-group">
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
                            preferedLevel={preferedLevel}
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