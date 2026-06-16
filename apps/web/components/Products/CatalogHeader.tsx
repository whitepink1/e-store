'use client'
import React from 'react'
import { catalogOrder } from '../../lib/data';
import { useSearchParams, useRouter } from 'next/navigation';

interface CatalogHeaderProps {
  order?: string | string[];
  children: React.ReactNode
}

const CatalogHeader = ({order, children}: CatalogHeaderProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentOrderValue = typeof order === 'string' ? order : 'title';

    const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('order', e.target.value);
        
        router.push(`?${params.toString()}`);
    };

    return (
        <div className='w-full flex justify-between'>
            {children}
            <select 
                className='w-[45dvw] border border-gray-500 p-1 md:w-64' 
                value={currentOrderValue}
                onChange={handleOrderChange}>
                {catalogOrder.map(item => {
                    return (
                        <option 
                            key={item.name} 
                            value={item.type}
                            className=''
                        >{item.name}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default CatalogHeader