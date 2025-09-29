'use client'
import Link from 'next/link'

const Desktop = ({ navItems }) => {

  const scrollToSection = (section) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <nav className={`header__nav`}>
        {navItems.map((item, index) => item.children ? (
            <div key={index} className='has-children'>
                <Link href={item.href} className='header__nav-item'>{item.label}</Link>
                <div className='header__nav-item-children'>
                    {item.children.map((child, index) => (
                        <Link href={child.href} key={index} className='header__nav-item'>{child.label}</Link>
                    ))}
                </div>
            </div>
        ) : (
            <Link href={item.href} key={index} className='header__nav-item' onClick={() => item.href.includes('#') && scrollToSection(item.href)}>{item.label}</Link>
        ))}
    </nav>
  )
}

export default Desktop