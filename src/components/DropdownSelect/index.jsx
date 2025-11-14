'use client';

import { useState, useRef, useEffect } from 'react';

const DropdownSelect = ({ 
    options = [], 
    onChange, 
    value = null,
    name = '',
    placeholder = 'Select an option',
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update selected option when value prop changes
    useEffect(() => {
        setSelectedOption(value);
    }, [value]);

    const handleSelect = (option) => {
        const optionValue = typeof option === 'object' ? option.value : option;
        setSelectedOption(optionValue);
        setIsOpen(false);
        if (onChange) {
            // Create an event-like object for compatibility with form handlers
            onChange({
                target: {
                    name: name,
                    value: optionValue
                }
            });
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const displayValue = selectedOption 
        ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption)
        : placeholder;

    return (
        <div className={`relative w-full ${className}`} ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                type="button"
                onClick={toggleDropdown}
                className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
                <div className="flex items-center justify-between">
                    <span className={`block truncate text-[16px] font-noyh ${!selectedOption ? 'text-gray-400' : 'text-gray-900'}`}>
                        {displayValue}
                    </span>
                    <svg className={`w-3 h-3  ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width={14} height={12} viewBox="0 0 14 12" fill="none">
            <path d="M6.92969 12L0.00148306 -3.51391e-07L13.8579 8.59975e-07L6.92969 12Z" fill="#404040" />
            </svg>

                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.length > 0 ? (
                        options.map((option, index) => {
                            const optionValue = typeof option === 'object' ? option.value : option;
                            const optionLabel = typeof option === 'object' ? option.label : option;
                            const isSelected = selectedOption 
                                ? (typeof selectedOption === 'object' ? selectedOption.value === optionValue : selectedOption === optionValue)
                                : false;

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 font-noyh transition-colors duration-150 ${
                                        isSelected ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-900'
                                    } ${index !== 0 ? 'border-t border-gray-100' : ''}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="block truncate">{optionLabel}</span>
                                        {isSelected && (
                                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                        <div className="px-4 py-3 text-gray-500 text-center">
                            No options available
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default DropdownSelect;