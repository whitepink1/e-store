'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import NavSearch from './NavSearch';
import { headerNav } from '../../lib/data';
import NavUser from './NavUser';
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className='flex justify-between items-center px-basic py-6 lg:py-4'>
      <Link href="/">
        <Image
          src='/icon/logo_black.png'
          width={96}
          height={32}
          alt='Cyber logo' />
      </Link>
      <NavSearch />
      <HamburgerMenu />
      <div className='hidden gap-10 lg:flex'>
        {headerNav.map(link => (
          <Link 
            key={link.title} 
            href={link.url}
            className={`text-base font-medium ${pathname === link.url ? 'text-black' : 'text-gray-200'} hover:scale-105`}>
              {link.title}
          </Link>
        ))}
      </div>
      <NavUser />
    </div>
  )
}

export default Header