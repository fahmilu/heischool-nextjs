import DropdownSelect from '@/components/DropdownSelect';

const ChildInfoForm = ({ index, genders, preferedLevel, handleChange, handleBlur, touched, errors, formData }) => {
    const getFieldError = (fieldName) => errors[`${fieldName}_${index}`];
    const isFieldTouched = (fieldName) => touched[`${fieldName}_${index}`];

    return (
        <div className="space-y-6">
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor={`childFullName_${index}`}>Child Full Name*</label>
                        <input 
                            type="text" 
                            id={`childFullName_${index}`}
                            name="childFullName"
                            value={formData.childFullName}
                            onChange={(e) => handleChange(index, e)}
                            onBlur={(e) => handleBlur(index, e)}
                            className={isFieldTouched('childFullName') && getFieldError('childFullName') ? 'error' : ''}
                        />
                        {isFieldTouched('childFullName') && getFieldError('childFullName') && (
                            <span className="error-message">{getFieldError('childFullName')}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor={`gender_${index}`}>Gender*</label>
                        <DropdownSelect 
                            options={genders} 
                            value={formData.gender}
                            name="gender"
                            onChange={(e) => handleChange(index, e)} 
                        />
                        {isFieldTouched('gender') && getFieldError('gender') && (
                            <span className="error-message">{getFieldError('gender')}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor={`birthdate_${index}`}>Birthdate*</label>
                        <input 
                            type="date" 
                            id={`birthdate_${index}`}
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={(e) => handleChange(index, e)}
                            onBlur={(e) => handleBlur(index, e)}
                            className={isFieldTouched('birthdate') && getFieldError('birthdate') ? 'error' : ''}
                        />
                        {isFieldTouched('birthdate') && getFieldError('birthdate') && (
                            <span className="error-message">{getFieldError('birthdate')}</span>
                        )}
                    </div>
                    <div className="form-col">
                        <label htmlFor={`preferedStartDate_${index}`}>Preferred Start Date*</label>
                        <input 
                            type="date" 
                            id={`preferedStartDate_${index}`}
                            name="preferedStartDate"
                            value={formData.preferedStartDate}
                            onChange={(e) => handleChange(index, e)}
                            onBlur={(e) => handleBlur(index, e)}
                            className={isFieldTouched('preferedStartDate') && getFieldError('preferedStartDate') ? 'error' : ''}
                        />
                        {isFieldTouched('preferedStartDate') && getFieldError('preferedStartDate') && (
                            <span className="error-message">{getFieldError('preferedStartDate')}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor={`preferedLevel_${index}`}>Preferred Level*</label>
                        <DropdownSelect 
                            options={preferedLevel} 
                            value={formData.preferedLevel}
                            name="preferedLevel"
                            onChange={(e) => handleChange(index, e)} 
                        />
                        {isFieldTouched('preferedLevel') && getFieldError('preferedLevel') && (
                            <span className="error-message">{getFieldError('preferedLevel')}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChildInfoForm;

