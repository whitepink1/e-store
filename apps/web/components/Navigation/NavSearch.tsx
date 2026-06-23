'use client'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getSearchProductsAction } from '../../app/actions/product';

interface SearchProductResult {
  _id: string;
  title: string;
  category: string;
  slug: string;
  variants: Array<{ finalPrice: number; images: string[] }>;
}

const NavSearch = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SearchProductResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await getSearchProductsAction(search);
        if (response?.success) {
          setResults(response.products || []);
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Search error: ', error);
      } finally {
        setIsLoading(false);
      }
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  
  return (
    <div ref={dropdownRef} className='relative hidden md:block max-lg:w-[50%] max-xl:w-[25%] 2xl:w-[30%]'>
        <input 
          type='text' 
          maxLength={25}
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full h-14 text-sm font-medium leading-4.5 bg-gray-80 focus:outline-none p-4 pl-12 rounded-lg focus:border focus:border-gray-10`}
          placeholder='Search'/>
        <Image
          src="/icon/search.png"
          width={24}
          height={24}
          alt="Search product"
          className='absolute top-1/2 -translate-y-1/2 left-4'/>
        {isOpen && results.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-90 overflow-y-auto">
            {results.map((product) => (
              <Link 
                key={product._id} 
                href={`/catalog/${product.category}/${product.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none"
              >
                {product.variants?.[0]?.images?.[0] && (
                  <Image
                    src={product.variants[0].images[0]}
                    width={40} 
                    height={40}
                    alt={product.title} 
                    className="object-contain rounded"
                  />
                )}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-medium text-sm text-gray-800 truncate">
                    {product.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {product.variants?.[0]?.finalPrice} $
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {isOpen && search && results.length === 0 && !isLoading && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 text-center text-sm text-gray-500 z-50">
            No results for your search query.
          </div>
        )}
    </div>
  )
}

export default NavSearch