'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import NavUser from './NavUser';
import { headerNav } from '../../lib/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavUserProps {
  isLoggedIn: boolean;
  onLogout: () => Promise<void>;
}

const HamburgerMenu = ({ isLoggedIn, onLogout }: NavUserProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;

      const target = event.target as Node;

      if ((dropdownMenuRef.current && !dropdownMenuRef.current.contains(target)) &&
          (buttonRef.current && !buttonRef.current.contains(target))) {
        setIsOpen(false);
      }
      
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className='block lg:hidden'> 
      <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className='relative z-30'>
        <Image 
          src='/icon/burger.png'
          width={40}
          height={40}
          alt="Burger menu"/>
      </button>
      {isOpen && (
        <div ref={dropdownMenuRef} className='min-w-15 bg-gray-25 absolute rounded-lg right-0 top-20 z-25'>
          <div className='flex flex-col gap-3 px-10 py-5'>
            {headerNav.map(link => (
              <Link 
                key={link.title} 
                href={link.url}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium ${pathname === link.url ? 'text-black' : 'text-gray-200'} hover:scale-105`}>
                  {link.title}
              </Link>
            ))}
            <NavUser addClass={` ${isLoggedIn ? 'w-full grid grid-cols-2' : 'flex flex-col items-start gap-3'}`} isLoggedIn={isLoggedIn} onLogout={onLogout} onClick={() => setIsOpen(false)}/>
          </div>
        </div>
      )}  
    </div>
  )
}

export default HamburgerMenu