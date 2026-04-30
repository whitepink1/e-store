import React from 'react';
import { footerNav, footerSocial } from '../../lib/data';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className='bg-black px-8 py-12 lg:py-26 lg:px-40'>
        <div className='flex flex-col justify-start items-center gap-8 lg:flex-row lg:justify-between lg:items-start'>
            <div className='flex flex-col items-center gap-4 lg:items-start'>
                <Image src='/icon/logo_white.png' height={32} width={96} alt="Cyber Logo"/>
                <p className='max-w-100 text-gray-100 text-[13px] font-normal text-center lg:text-start'>We are a residential interior design firm located in Portland. Our boutique-studio offers more than.</p>
            </div>
            {footerNav.map(item => (
                <div key={item.name} className='flex flex-col items-center gap-2 lg:items-start lg:min-w-45'>
                    <p className='h4 text-white'>{item.name}</p>
                    {item.links.map(link => (
                        <Link 
                            key={link.title} 
                            href={link.url}
                            className='text-gray-100 text-[14px] font-light'
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            ))}
        </div>
        <div className='flex justify-center gap-8 mt-8 lg:justify-start lg: gap-12'>
            {footerSocial.map(link => (
                <Link key={link.name} href={link.url}>
                    <Image 
                        src={link.src} 
                        height={24} 
                        width={24} 
                        alt={`${link.name} link`} 
                        className='hover:scale-115'/>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Footer