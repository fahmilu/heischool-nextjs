'use client';
import { useState, useEffect } from 'react';
import Enrollment from './Tabs/Enrollment';
import VisitUs from './Tabs/VisitUs';
import Collaboration from './Tabs/Collaboration';
import Image from 'next/image';
const Contact = () => {
    const [activeTab, setActiveTab] = useState(null);

    // Handle initial tab state based on URL hash
    useEffect(() => {
        const hash = window.location.hash.slice(1); // Remove the # symbol
        if (hash && ['visit-us', 'enrollment', 'collaboration'].includes(hash)) {
            setActiveTab(hash);
        } else {
            setActiveTab('enrollment');
        }
    }, []);

    // Update URL hash when tab changes
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        window.history.pushState(null, null, `#${tabId}`);
    };

    const tabs = [
        // { id: 'visit-us', label: 'Visit Us', component: VisitUs },
        { id: 'enrollment', label: 'Enrollment', component: Enrollment },
        { id: 'collaboration', label: 'Collaboration', component: Collaboration }
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

    return (
        <section className="contact-us">
            <div className="contact-us__image">
                <Image src="/imgs/contact-banner.jpg" className="!md:block !hidden" alt="Contact Us" fill />
                <Image src="/imgs/contact-mobile.jpg" className="!block !md:hidden" alt="Contact Us" fill />
            </div>
            <div className="contact-us__container">
                {/* Tabs Navigation */}
                <div className="contact-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`contact-tab ${
                                activeTab === tab.id
                                    ? 'contact-tab-active'
                                    : 'contact-tab-inactive'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="contact-tab-content">
                    {ActiveComponent && <ActiveComponent />}
                </div>
            </div>
        </section>
    );
}

export default Contact;