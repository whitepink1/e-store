'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface FieldType {
  label: string;
  value: string;
}

interface FilterGroupProps {
  item: { 
    name: string; 
    type: string; 
    fields: (string | FieldType)[];
  };
  open: boolean;
}

export const FilterGroup = ({ item, open }: FilterGroupProps) => {
  const [isOpen, setIsOpen] = useState(open || false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeFilters = searchParams.getAll(item.type);

  const handleCheckboxChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeFilters.includes(value)) {
      const updatedFilters = activeFilters.filter(val => val !== value);
      params.delete(item.type);
      updatedFilters.forEach(val => params.append(item.type, val));
    } else {
      params.append(item.type, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 select-none border-b border-gray-500"
      >
        <span className='font-medium text-lg text-black'>{item.name}</span>
        <svg 
          className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="flex flex-col gap-2 mt-4 pl-1 animate-fadeIn">
          {item.fields.map((field, index) => {
            const isObject = typeof field === 'object' && field !== null;
            const label = isObject ? (field as FieldType).label : (field as string);
            const value = isObject ? (field as FieldType).value : (field as string);

            const isChecked = activeFilters.includes(value);
            return (
            <label key={index} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input 
                type="checkbox" 
                value={value}
                checked={isChecked}
                onChange={() => handleCheckboxChange(value)}
                className="rounded 
                    border
                    border-gray-10 
                    w-4 h-4 bg-white 
                    appearance-none 
                    cursor-pointer
                    transition-all
                    flex items-center justify-center
                  checked:bg-black 
                  checked:border-black
                    checked:after:content-['✓']
                  checked:after:text-white
                    checked:after:font-bold
                    checked:after:text-[10px]
                    checked:after:translate-y-[-0.5px]"
              />
              <span className='font-medium text-base'>{label}</span>
            </label>
          )})}
        </div>
      )}
    </div>
  );
};