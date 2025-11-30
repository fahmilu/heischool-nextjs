import DropdownSelect from '@/components/DropdownSelect';

const ChildInfoForm = ({ index, genders, prevered_level, handleChange, handleBlur, touched, errors, formData }) => {
    const getFieldError = (fieldName) => errors[`${fieldName}_${index}`];
    const isFieldTouched = (fieldName) => touched[`${fieldName}_${index}`];

    return (
        <div className="space-y-6">
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor={`name_${index}`}>Child Full Name*</label>
                        <input 
                            type="text" 
                            id={`name_${index}`}
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(index, e)}
                            onBlur={(e) => handleBlur(index, e)}
                            className={isFieldTouched('name') && getFieldError('name') ? 'error' : ''}
                        />
                        {isFieldTouched('name') && getFieldError('name') && (
                            <span className="error-message">{getFieldError('name')}</span>
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
                        <label htmlFor={`birth_date_${index}`}>Birth_date*</label>
                        <input 
                            type="date" 
                            id={`birth_date_${index}`}
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={(e) => handleChange(index, e)}
                            onBlur={(e) => handleBlur(index, e)}
                            className={isFieldTouched('birth_date') && getFieldError('birth_date') ? 'error' : ''}
                        />
                        {isFieldTouched('birth_date') && getFieldError('birth_date') && (
                            <span className="error-message">{getFieldError('birth_date')}</span>
                        )}
                    </div>
                    <div className="form-col">
                        <label htmlFor={`prefered_start_date_${index}`}>Preferred Start Date*</label>
                        <input 
                            type="date" 
                            id={`prefered_start_date_${index}`}
                            name="prefered_start_date"
                            value={formData.prefered_start_date}
                            onChange={(e) => handleChange(index, e)}
                            onBlur={(e) => handleBlur(index, e)}
                            className={isFieldTouched('prefered_start_date') && getFieldError('prefered_start_date') ? 'error' : ''}
                        />
                        {isFieldTouched('prefered_start_date') && getFieldError('prefered_start_date') && (
                            <span className="error-message">{getFieldError('prefered_start_date')}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor={`prevered_level_${index}`}>Preferred Level*</label>
                        <DropdownSelect 
                            options={prevered_level} 
                            value={formData.prevered_level}
                            name="prevered_level"
                            onChange={(e) => handleChange(index, e)} 
                        />
                        {isFieldTouched('prevered_level') && getFieldError('prevered_level') && (
                            <span className="error-message">{getFieldError('prevered_level')}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChildInfoForm;

