const VisitUs = () => {
    const visitTimes = [
        '9.30AM - 10.00AM',
        '10.30AM - 11.00AM',
        '11.30AM - 12.00PM'
    ]

    const HowHearUs = [
        'Google Search',
        'Word of mouth',
        'Instagram',
        'Email',
        'Marketing Booth',
        'Other'
    ]

    return (
        <form className="visit-us-form">
            <div className="form-group">
                <h4>Parents/Legal Guardian Name<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor="name">First Name</label>
                        <input type="text" id="first-name" name="first-name" />
                    </div>
                    <div className="form-col">
                        <label htmlFor="email">Last Name</label>
                        <input type="email" id="last-name" name="last-name" />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <h4>Email<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor="name">Email</label>
                        <input type="text" id="email" name="email" />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <h4>Phone Number<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col">
                        <label htmlFor="name">Phone Number</label>
                        <input type="text" id="phone-number" name="phone-number" />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <h4>Visit Date<small>(Required)</small></h4>
                <p>*The school tour is available on weekdays, Monday-Thursday, from 9:30 AM to 12:00 PM.</p>
                <div className="form-row">
                    <div className="form-col">
                        <div className="form-col">
                            <label htmlFor="name">Visit Date</label>
                            <input type="date" id="visit-date" name="visit-date" />
                        </div>
                    </div>
                    <div className="form-col">
                        <div className="form-col">
                        <label htmlFor="name">Time</label>
                            <select type="date" id="visit-time" name="visit-time">
                                {visitTimes.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <h4>How did you hear about us?<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col form-checkbox-group">
                        {HowHearUs.map((item, index) => (
                            <div className="form-checkbox" key={index}>
                                <input type="checkbox" id={item} name={item} />
                                <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="form-group button-group">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default VisitUs;