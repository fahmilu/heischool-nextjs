import DropdownSelect from '@/components/DropdownSelect';
const ContactForm = ({ index, relations, handleChange, handleBlur, touched, errors, formData }) => {
    const getFieldError = (fieldName) => errors[`${fieldName}_${index}`];
    const isFieldTouched = (fieldName) => touched[`${fieldName}_${index}`];

    return (
        <div className="space-y-6">
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor={`parentName_${index}`}>Parent's Name*</label>
                        <input 
                            type="text" 
                            id={`parentName_${index}`}
                            name="parentName"
                            value={formData.parentName}
                            onChange={(e) => handleChange(index, e)}
                            onBlur={(e) => handleBlur(index, e)}
                            className={isFieldTouched('parentName') && getFieldError('parentName') ? 'error' : ''}
                        />
                        {isFieldTouched('parentName') && getFieldError('parentName') && (
                            <span className="error-message">{getFieldError('parentName')}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor={`relationship_${index}`}>Relationship to Child*</label>
                        <DropdownSelect 
                            options={relations} 
                            value={formData.relationship}
                            name="relationship"
                            onChange={(e) => handleChange(index, e)} 
                        />
                        {isFieldTouched('relationship') && getFieldError('relationship') && (
                            <span className="error-message">{getFieldError('relationship')}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor={`email_${index}`}>Email*</label>
                        <input 
                            type="email" 
                            id={`email_${index}`}
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleChange(index, e)}
                            onBlur={(e) => handleBlur(index, e)}
                            className={isFieldTouched('email') && getFieldError('email') ? 'error' : ''}
                        />
                        {isFieldTouched('email') && getFieldError('email') && (
                            <span className="error-message">{getFieldError('email')}</span>
                        )}
                    </div>
                    <div className="form-col">
                        <label htmlFor={`phoneNumber_${index}`}>Phone Number*</label>
                        <input 
                            type="text" 
                            id={`phoneNumber_${index}`}
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) => handleChange(index, e)}
                            onBlur={(e) => handleBlur(index, e)}
                            className={isFieldTouched('phoneNumber') && getFieldError('phoneNumber') ? 'error' : ''}
                        />
                        {isFieldTouched('phoneNumber') && getFieldError('phoneNumber') && (
                            <span className="error-message">{getFieldError('phoneNumber')}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor={`address_${index}`}>Address*</label>
                        <input 
                            type="text" 
                            id={`address_${index}`}
                            name="address"
                            value={formData.address}
                            onChange={(e) => handleChange(index, e)}
                            onBlur={(e) => handleBlur(index, e)}
                            className={isFieldTouched('address') && getFieldError('address') ? 'error' : ''}
                        />
                        {isFieldTouched('address') && getFieldError('address') && (
                            <span className="error-message">{getFieldError('address')}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;