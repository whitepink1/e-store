'use client'
import React from 'react'
import { catalogOrder } from '../../lib/data';
import { useSearchParams, useRouter } from 'next/navigation';

interface CatalogHeaderProps {
  total: number;
  order?: string | string[];
}

const CatalogHeader = ({total = 0, order}: CatalogHeaderProps) => {
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
            <p className='font-medium text-base text-gray-20/85'>Selected Products: 
                <span className='text-[20px] text-black'> {total}</span>
            </p>
            <select 
                className='w-64 border border-gray-500 p-1' 
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