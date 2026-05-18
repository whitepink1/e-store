import React from 'react'
import { ProductCardProps } from '../../lib/validations/product'
import Button from '../shared/Button'
import Image from 'next/image'

const ProductCatalogCard = ({product}: ProductCardProps) => {
    return (
        <div className='h-110 flex flex-col justify-between items-center relative bg-white-100 p-4 rounded-lg'>
            <button className='self-end h-8'>O</button>
            <Image
                src={product.variants[0]?.images[0] || ''}
                height={180}
                width={180}
                alt={product.title}/>
            <p className='font-medium text-base leading-6'>{product.title}</p>
            <p className='font-semibold text-2xl'>$ {product.variants[0]?.finalPrice}</p>
            <Button 
                href={`/catalog/${product.category}/${product.slug}`}
                variant='blackFill'>Buy Now</Button>
        </div>
    )
}

export default ProductCatalogCard