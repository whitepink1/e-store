'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface PaginationProps {
    totalItems: number;
    currentPage: number;
    hasNextPage: boolean;
    totalPages: number;
    perPage: number;
}

const Pagination = ({totalItems, currentPage, hasNextPage, totalPages, perPage}: PaginationProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        if (currentPage < 1 || currentPage > totalPages) {
            console.log('Fixing invalid page parameter:', currentPage, totalPages);
            
            const params = new URLSearchParams(searchParams.toString());
            params.delete('page');
            
            router.push(`${pathname}?${params.toString()}`);
        }
    }, [currentPage, totalPages, pathname, router, searchParams]);

    if (totalPages <= 1) return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (page <= 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);
    return (
        <div className='w-full flex items-center justify-center gap-2 my-8'>
            <button 
                className='px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors' 
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                >
                    ← Prev
            </button>
            <div className="flex items-center gap-1">
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => changePage(page)}
                        className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === page
                                ? 'bg-black text-white'
                                : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button 
                className='px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors' 
                onClick={() => changePage(currentPage + 1)}
                disabled={!hasNextPage}
                >
                    Next →
            </button>
        </div>
    )
}

export default Pagination