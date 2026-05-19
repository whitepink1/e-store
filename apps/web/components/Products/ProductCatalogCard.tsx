import React from 'react'
import { ProductCardProps } from '../../lib/validations/product'
import Button from '../shared/Button'
import Image from 'next/image'

const ProductCatalogCard = ({product}: ProductCardProps) => {
    return (
        <div className='w-72 h-110 flex flex-col justify-between items-center relative bg-white-100 p-4 rounded-lg z-10'>
            <button className='self-end h-8 z-15 cursor-pointer'>O</button>
            <div className='relative w-50 h-50'>
                <Image
                    src={product.variants[0]?.images[0] || ''}
                    // height={180}
                    // width={180}
                    fill
                    alt={product.title}
                    className='object-contain'/>
            </div>
            <p className='font-medium text-base leading-6'>{product.title}</p>
            <p className='font-semibold text-2xl'>$ {product.variants[0]?.finalPrice}</p>
            <Button 
                href={`/catalog/${product.category}/${product.slug}`}
                variant='blackFill'>Buy Now</Button>
        </div>
    )
}

export default ProductCatalogCard