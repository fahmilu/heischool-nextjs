'use client'
import React from 'react'
import Desktop from '@/components/Nav/Desktop';
import Mobile from '@/components/Nav/Mobile';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About HEI",
      href: "#about-hei",
    },
    {
      label: "Our Approach",
      href: "/approach",
    },
    {
      label: "Our Locations",
      href: "/locations",
      children: [
        {
          label: "Senayan",
          href: "/locations/senayan",
        },
        {
          label: "Menteng",
          href: "/locations/menteng",
        }
      ]
    },
    {
      label: "Enrollment",
      href: "/contact?#enrollment",
    },
    {
      label: "News",
      href: "/news",
    }
  ]      
  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className='container'>
        <Mobile navItems={navItems} />
        <Desktop navItems={navItems} />
        <Link href="/" className='header__brand'>
          <Image src="/imgs/logo.png" alt="HEI Schools" fill />
        </Link>
      </div>
    </header>
  )
}

export default Header