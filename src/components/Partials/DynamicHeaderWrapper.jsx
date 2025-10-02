'use client'
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function DynamicHeaderWrapper() {
  const pathname = usePathname();
  
  // Determine if we're on the home page
  const isHome = pathname === '/';
  
  return <Header isHome={isHome} />;
}
