'use client'
import { useState } from 'react';
import { handleFavouriteAction } from '../../app/actions/user';
import { ProductCardProps } from '../../lib/validations/product';
import Button from '../shared/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ExtendedProductCardProps extends ProductCardProps {
    initialIsFavourite?: boolean;
}

const ProductCatalogCard = ({product, initialIsFavourite = false}: ExtendedProductCardProps) => {
    const [isFavourite, setIsFavourite] = useState(initialIsFavourite);
    const router = useRouter();

    const handleFavourite = async () => {
        setIsFavourite((prev) => !prev);
        try {
            const result = await handleFavouriteAction(product._id || '');
            if (!result.success) {
                setIsFavourite((prev) => !prev);
                alert(result.message || "Updating favourite product failed");
            } else {
                window.dispatchEvent(new Event('wishlist-updated'));
                router.refresh();
            }
        } catch(err) {
            console.log(err);
        }
    };
    return (
        <div className='w-full min-h-105 flex flex-col justify-between items-center relative bg-white-100 p-4 rounded-lg z-10'>
            <button className='self-end h-8 z-15 cursor-pointer' onClick={handleFavourite}>
                <Image 
                    src={isFavourite ? '/icon/favourite_red.png' : '/icon/favourite_gray.png'}
                    height={30}
                    width={30}
                    alt='Add / remove favourite'
                    className='hover:scale-105'/>
            </button>
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