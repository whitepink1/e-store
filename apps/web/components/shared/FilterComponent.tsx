'use client'
import React, { useEffect, useState } from 'react'
import { FilterGroup } from './FilterGroup'
import { FilterField } from '../../lib/data';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [localFilters, setLocalFilters] = useState<Record<string, string[]>>({});

    useEffect(() => {
    if (mobile && isOpen) {
        const initialFilters: Record<string, string[]> = {};
    
        const getParamArray = (type: string) => {
        return (searchParams.get(type) || '').split(',').filter(Boolean);
        };

        initialFilters[currentBrands.type] = getParamArray(currentBrands.type);
        
        currentFilter?.forEach(item => {
        initialFilters[item.type] = getParamArray(item.type);
        });
        
        setLocalFilters(initialFilters);
    }
    }, [isOpen, mobile]);

    const handleFilterChange = (type: string, value: string) => {
        if (mobile) {
            setLocalFilters(prev => {
            const currentActive = prev[type] || [];
            const updated = currentActive.includes(value)
                ? currentActive.filter(val => val !== value)
                : [...currentActive, value];
            return { ...prev, [type]: updated };
            });
        } else {
            const params = new URLSearchParams(searchParams.toString());
            const currentParamString = searchParams.get(type) || '';
            let activeFilters = currentParamString.split(',').filter(Boolean);

            if (activeFilters.includes(value)) {
                activeFilters = activeFilters.filter(val => val !== value);
            } else {
                activeFilters.push(value);
            }

            if (activeFilters.length > 0) {
                params.set(type, activeFilters.join(',')); 
            } else {
                params.delete(type); 
            }

            router.push(`${pathname}?${params.toString()}`);
        }
    };

    const handleApplyMobileFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(localFilters).forEach(([type, values]) => {
            if (values.length > 0) {
                params.set(type, values.join(','));
            } else {
                params.delete(type);
            }
        });

        router.push(`${pathname}?${params.toString()}`);
        setIsOpen(false);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const getActiveFilters = (type: string) => {
        if (mobile) {
            return localFilters[type] || [];
        }
  
        const paramString = searchParams.get(type) || '';
        return paramString.split(',').filter(Boolean);
    };

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
                    <div className='fixed inset-0 bg-white z-40 px-basic overflow-y-auto pb-24'>
                        <button 
                            className='flex items-center justify-center text-black/70 text-2xl font-medium leading-8 my-8' 
                            onClick={() => {
                                setIsOpen(false)
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                                }}>
                            <Image 
                                src='/icon/arrow-left.png'
                                width={24}
                                height={24}
                                alt='Arrow left'/>
                            Filters
                        </button>
                        <div>
                            <FilterGroup 
                                item={currentBrands} 
                                open={openBrands}
                                activeFilters={getActiveFilters(currentBrands.type)}
                                onFilterChange={handleFilterChange} />
                            {currentFilter && currentFilter.map((item, index) => (
                                <FilterGroup 
                                    key={index} 
                                    item={item} 
                                    open={openFilters}
                                    activeFilters={getActiveFilters(item.type)}
                                    onFilterChange={handleFilterChange}/>
                            ))}
                        </div>
                        <div className='fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50'>
                            <button 
                                onClick={handleApplyMobileFilters}
                                className='w-full bg-black text-white py-4 rounded-lg font-semibold text-lg active:scale-[0.98] transition-all'
                            >
                            Apply
                            </button>
                        </div>
                    </div>
                )}
            </section>

        :
            
            <section className='hidden w-64 flex-col items-start gap-6 mb-40 md:flex'>
                <FilterGroup 
                    item={currentBrands} 
                    open={openBrands} 
                    activeFilters={getActiveFilters(currentBrands.type)}
                    onFilterChange={handleFilterChange}/>
                {currentFilter && currentFilter.map((item, index) => (
                    <FilterGroup 
                        key={index} 
                        item={item} 
                        open={openFilters}
                        activeFilters={getActiveFilters(item.type)}
                        onFilterChange={handleFilterChange}/>
                ))}
            </section>
        }
        </>
    )
}

export default FilterComponent