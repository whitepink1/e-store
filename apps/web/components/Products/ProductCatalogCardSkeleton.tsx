import React from 'react'

const ProductCatalogCardSkeleton = () => {
    return (
        <div className='w-full min-h-105 flex flex-col justify-between items-center relative bg-white p-4 rounded-lg border border-gray-100 animate-pulse'>
            <div className='self-end h-8 w-8 bg-gray-200/75 rounded-full'></div>
            <div className='h-45 w-45 bg-gray-200/75 rounded-lg flex items-center justify-center mt-6'>
                <svg className="w-10 h-10 text-white/75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a1 1 0 0 1 .845.458l2.065 3.098 1.339-1.999a1 1 0 0 1 1.616-.044l4.25 6a1 1 0 0 1-.131 1.368Z"/>
                </svg>
            </div>
            
            <div className='w-full space-y-2 px-2 flex flex-col items-center'>
                <div className='h-4 bg-gray-200/75 rounded w-2/3'></div>
                <div className='h-4 bg-gray-200/75 rounded w-2/3'></div>
            </div>
            
            <div className='h-8 bg-gray-200/75 rounded w-1/3'></div>
            
            <div className='w-1/2 h-11 bg-gray-200/75 rounded-md'></div>
            
        </div>
    )
}

export default ProductCatalogCardSkeleton;