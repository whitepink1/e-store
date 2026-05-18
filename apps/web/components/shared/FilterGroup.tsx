'use client'
import { useState } from 'react';

interface FilterGroupProps {
  item: { name: string; type: string; fields: string[] };
  open: boolean;
}

export const FilterGroup = ({ item, open }: FilterGroupProps) => {
  const [isOpen, setIsOpen] = useState(open || false);

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
          {item.fields.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input 
                type="checkbox" 
                value={option}
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
              <span className='font-medium text-base'>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};