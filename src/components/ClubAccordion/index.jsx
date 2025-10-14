// import { useState } from 'react';

const ClubAccordion = ({ title, description, setActiveItem, active, isOpen, index }) => {
    // const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setActiveItem(active === index ? null : index);
    };  

    return (
        <div className="accordion">
            <div 
                className="accordion-header" 
                onClick={() => toggleAccordion()}
            >
                <span>
                    {title}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="15" viewBox="0 0 29 15" fill="none">
                    <path d="M1.69141 2L12.9775 12.6961C13.749 13.4273 14.9576 13.4273 15.729 12.6962L27.0151 2" stroke="#404040" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            </div>
            <div 
                className="accordion-content"
                style={{
                    maxHeight: isOpen ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                }}
            >
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>
    );
}

export default ClubAccordion;