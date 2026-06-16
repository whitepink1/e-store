'use client'
import React, { useState } from 'react'
import { FilterGroup } from './FilterGroup'
import { FilterField } from '../../lib/data';
import Image from 'next/image';

interface FieldType {
  label: string;
  value: string;
}

interface FilterProps {
    mobile?: boolean;
    currentBrands: {
        name: string;
        type: string;
        fields: (string | FieldType)[];
    };
    openBrands: boolean;
    openFilters: boolean;
    currentFilter: FilterField[] | undefined;
}

const FilterComponent = ({mobile = false, currentBrands, openBrands, openFilters, currentFilter}: FilterProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
        {mobile ? 
            <section className='block md:hidden'>
                <button className='w-[45dvw] flex justify-between items-center border border-gray-500 p-4 md:w-64 max-md:h-14' onClick={() => setIsOpen(true)}>
                    Filters
                    <Image
                        src='/icon/filters.png'
                        width={24}
                        height={24}
                        alt='Filters'/>
                </button>
                {isOpen && (
                    <div className='absolute top-22.5 left-0 inset-0 bg-white/75 z-40 px-basic'>
                        <button className='flex items-center justify-center text-black/70 text-2xl font-medium leading-8 my-8'>
                            <Image 
                                src='/icon/arrow-left.png'
                                width={24}
                                height={24}
                                alt='Arrow left'/>
                            Filters
                        </button>
                        <div>
                            <FilterGroup item={currentBrands} open={openBrands} />
                            {currentFilter && currentFilter.map((item, index) => (
                                <FilterGroup key={index} item={item} open={openFilters}/>
                            ))}
                        </div>
                    </div>
                )}
            </section>

        :
            
            <section className='hidden w-64 flex-col items-start gap-6 mb-40 md:flex'>
                <FilterGroup item={currentBrands} open={openBrands} />
                {currentFilter && currentFilter.map((item, index) => (
                    <FilterGroup key={index} item={item} open={openFilters}/>
                ))}
            </section>
        }
        </>
    )
}

export default FilterComponent