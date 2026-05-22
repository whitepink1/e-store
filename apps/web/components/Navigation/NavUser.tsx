'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { logoutAction } from '../../app/actions/auth';
import Image from 'next/image';

interface NavUserProps {
  isLoggedIn: boolean;
  onLogout: () => Promise<void>;
}

const NavUser = ({ isLoggedIn, onLogout }: NavUserProps) => {

  return (
    <div className='hidden items-center gap-6 lg:flex'>
      {isLoggedIn ? (
        <>
          <Link href='/profile?tab=favourite' className='w-8 h-8 flex justify-center items-center'>
            <Image
              src='/icon/favourite.png'
              width={20}
              height={20}
              alt='Favourite button'/>
          </Link>
          <Link href='/profile?tab=cart' className='w-8 h-8 flex justify-center items-center'>
            <Image
              src='/icon/cart.png'
              width={20}
              height={20}
              alt='Cart button'/>
          </Link>
          <Link href='/profile?tab=profile' className='w-8 h-8 flex justify-center items-center'>
            <Image
              src='/icon/profile.png'
              width={20}
              height={20}
              alt='Profile button'/>
          </Link>
          <button onClick={onLogout} className='w-8 h-8 flex justify-center items-center cursor-pointer hover:scale-105'>
            <Image
              src='/icon/logout.png'
              width={20}
              height={20}
              alt='Logout button'/>
          </button>
        </>)
        :
        (<>
          <Link href="/login" className="text-base font-medium text-gray-200 hover:text-black transition">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-base font-medium border border-black px-4 py-1.5 rounded hover:bg-black hover:text-white transition">
            Sign Up
          </Link>
        </>
      )}
    </div>
  )
}

export default NavUser