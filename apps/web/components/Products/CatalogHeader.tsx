import React from 'react'

interface CatalogHeaderProps {
  total: number;
}

const CatalogHeader = ({total}: CatalogHeaderProps) => {
    return (
        <div className='flex justify-between'>
            <p className='font-medium text-base text-gray-20'>Selected Products: 
                <span className='text-[20px]'>{total}</span>
            </p>
        </div>
    )
}

export default CatalogHeader