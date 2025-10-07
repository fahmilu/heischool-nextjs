const Collaboration = () => {

    const Subjects = [
        'School Tour',
        'Enrollment',
        'Collaboration',
        'Other'
    ]

    return (
        <form className="visit-us-form">
            <div className="form-group">
                <h4>Your Name<small>(Required)</small></h4>
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
                <h4>What do you want to collaborate with us?<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col">
                        <div className="form-col">
                            <select type="date" id="subject" name="subject">
                                {Subjects.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <h4>Message<small>(Required)</small></h4>
                <div className="form-row">
                    <div className="form-col form-checkbox-group">
                        <div className="form-col">
                            <textarea type="text" id="message" name="message" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group button-group">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default Collaboration;