'use client'
import React from 'react'
import Desktop from '@/components/Nav/Desktop';
import Mobile from '@/components/Nav/Mobile';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { 
  fetchLocations, 
  selectAllLocations, 
} from '@/redux/slices/locationsSlice';
const Header = ({ isHome = true }) => {
  const dispatch = useAppDispatch();
  const locations = useAppSelector(selectAllLocations);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Fetch locations when component mounts
    if (locations.length === 0) {
      dispatch(fetchLocations());
    }
  }, [dispatch, locations.length]);

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
      label: "About HEI",
      href: "/",
    },
    {
      label: "Our Approach",
      href: "/our-approach",
    },
    {
      label: "Our Locations",
      href: "/locations",
      children: locations.map((location) => ({
        label: location.label,
        href: `/locations/${location.slug}`,
      })),
    },
    {
      label: "Enrollment",
      href: "/contact-us#enrollment",
    },
    {
      label: "News",
      href: "/news",
    }
  ]      
  return (
    <header className={`header ${isScrolled || !isHome ? 'header--scrolled' : ''}`}>
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