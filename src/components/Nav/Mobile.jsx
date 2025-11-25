'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import ChatWithUs from './ChatWithUs';
const Mobile = ({ navItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setOpenSubmenu(null);
    };

    const toggleSubmenu = (index) => {
        setOpenSubmenu(openSubmenu === index ? null : index);
    };

    const scrollToSection = (section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <>
            <div className='header__nav-mobile'>
                <div onClick={toggleMenu} className={`header__nav-mobile-btn ${isOpen ? 'header__nav-mobile-btn--open' : ''}`}>{isOpen ? 'Close' : 'Menu'}</div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div 
                    className='mobile-menu-overlay'
                    onClick={toggleMenu}
                />
            )}

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}>
                <nav className='mobile-menu__nav'>
                    {navItems.map((item, index) => (
                        <div key={index} className='mobile-menu__item-wrapper'>
                            {/* {item.children ? (
                                <>
                                    <button
                                        className='mobile-menu__item mobile-menu__item--parent'
                                        onClick={() => toggleSubmenu(index)}
                                    >
                                        {item.label}
                                        <svg 
                                            className={`mobile-menu__arrow ${openSubmenu === index ? 'mobile-menu__arrow--open' : ''}`}
                                            width="12" 
                                            height="8" 
                                            viewBox="0 0 12 8" 
                                            fill="none"
                                        >
                                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                    </button>
                                    <div className={`mobile-menu__submenu ${openSubmenu === index ? 'mobile-menu__submenu--open' : ''}`}>
                                        {item.children.map((child, childIndex) => (
                                            <Link
                                                href={child.href}
                                                key={childIndex}
                                                className='mobile-menu__item mobile-menu__item--child'
                                                onClick={toggleMenu}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className='mobile-menu__item'
                                    onClick={() => {
                                        if (item.href.includes('#')) {
                                            scrollToSection(item.href);
                                        } else {
                                            toggleMenu();
                                        }
                                    }}
                                >
                                    {item.label}
                                </Link>
                            )} */}
                                <Link
                                    href={item.href}
                                    className='mobile-menu__item'
                                    onClick={() => {
                                        if (item.href.includes('#')) {
                                            toggleMenu();
                                            scrollToSection(item.href);
                                        } else {
                                            toggleMenu();
                                        }
                                    }}
                                >
                                    {item.label}
                                </Link>
                        </div>
                    ))}
                </nav>
                <ChatWithUs />
            </div>
        </>
    );
}

export default Mobile;