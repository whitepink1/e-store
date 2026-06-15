'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCartAction, getFavouriteAction } from '../../app/actions/user';

interface NavUserProps {
  isLoggedIn: boolean;
  onLogout: () => Promise<void>;
  addClass?: string;
  onClick?: () => void;
}

const NavUser = ({ addClass, isLoggedIn, onLogout, onClick = () => {} }: NavUserProps) => {
  const [favCount, setFavCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const checkFavourites = useCallback(async () => {
    if (!isLoggedIn) {
      setFavCount(0);
      return;
    }
    try {
      const response = await getFavouriteAction();
      const list = response?.favourites || [];
      setFavCount(list.length);
    } catch (err) {
      console.error("Failed to load favourites count.", err);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    onClick();
    onLogout();
  }

  const checkCart = useCallback(async () => {
    if (!isLoggedIn) {
      setCartCount(0);
      return;
    }
    try {
      const response = await getCartAction();
      const list = response?.cart || [];
      setCartCount(list.length);
    } catch (err) {
      console.error("Failed to load cart count.", err);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkCart();
    window.addEventListener('cart-updated', checkCart);
    return () => {
      window.removeEventListener('cart-updated', checkCart);
    };
  }, [checkCart]);

  useEffect(() => {
    checkFavourites();
    window.addEventListener('wishlist-updated', checkFavourites);
    return () => {
      window.removeEventListener('wishlist-updated', checkFavourites);
    };
  }, [checkFavourites]);

  return (
    <div className={`${addClass ? `${addClass}` : 'hidden items-center gap-6 lg:flex'}`}>
      {isLoggedIn ? (
        <>
          <Link href='/profile?tab=favourite' onClick={onClick} className='w-8 h-8 relative flex justify-center items-center'>
            <Image
              src='/icon/favourite.png'
              width={20}
              height={20}
              alt='Favourite button'/>
            {favCount > 0 && <p className='h-5 w-5 left-4 bottom-3 absolute flex items-center justify-center text-xs font-medium bg-gray-10 rounded-full'>{favCount}</p>}
          </Link>
          <Link href='/profile?tab=cart' onClick={onClick} className='w-8 h-8 relative flex justify-center items-center'>
            <Image
              src='/icon/cart.png'
              width={20}
              height={20}
              alt='Cart button'/>
            {cartCount > 0 && <p className='h-5 w-5 left-5 bottom-3 absolute flex items-center justify-center text-xs font-medium bg-gray-10 rounded-full'>{cartCount}</p>}
          </Link>
          <Link href='/profile?tab=profile' onClick={onClick} className='w-8 h-8 flex justify-center items-center'>
            <Image
              src='/icon/profile.png'
              width={20}
              height={20}
              alt='Profile button'/>
          </Link>
          <button onClick={handleLogout} className='w-8 h-8 flex justify-center items-center cursor-pointer hover:scale-105'>
            <Image
              src='/icon/logout.png'
              width={20}
              height={20}
              alt='Logout button'/>
          </button>
        </>)
        :
        (<>
          <Link href="/login" onClick={onClick} className="text-base font-medium text-gray-200 hover:text-black transition">
            Sign In
          </Link>
          <Link href="/sign-up" onClick={onClick} className="text-base font-medium border border-black px-4 py-1.5 rounded hover:bg-black hover:text-white transition">
            Sign Up
          </Link>
        </>
      )}
    </div>
  )
}

export default NavUser