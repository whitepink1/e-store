'use client'

import { useEffect, useState } from "react";
import { Product } from "../../lib/validations/product";
import { getFavouriteAction, handleFavouriteAction } from "../../app/actions/user";
import { getProductsByIdsAction } from "../../app/actions/product";
import Image from "next/image";

const Favourite = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
        
    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                setIsLoading(true);
                const response = await getFavouriteAction();
                const list = response?.favourites || [];
                if (!list) return;
                
                const result = await getProductsByIdsAction(list);
    
                if (result.success && result.data) {
                    setProducts(result.data);
                    console.log('Data: ', result.data);
                } else {
                    throw new Error(result.message || "Didn't found any product.");
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchFavourites();
    }, []);

    const handleRemove = async (id: string) => {
        try {
            const result = await handleFavouriteAction(id || '');
            if (!result.success) {
                alert(result.message || "Updating favourite product failed");
            } else {
                setProducts(prevProducts => prevProducts.filter(p => p._id !== id));
                window.dispatchEvent(new Event('wishlist-updated'));
            }
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div>{isLoading 
        ?
            <p>Loading...</p>
        :
            <>{products.length > 0 ? 
                <div className="flex flex-col gap-3">
                    {products.map(product => (
                        <div key={product.slug} className='grid grid-cols-4 items-center bg-white-100 rounded-lg p-3 lg:w-200'>
                            <Image
                                src={product.variants[0]?.images[0] || ''}
                                height={80}
                                width={80}
                                alt={product.slug || ''}
                                className='rounded-lg'/>
                            <p className='text-lg font-medium px-2'>{product.title}</p>
                            <p className='text-lg font-medium px-2 justify-self-center'>{product.category}</p>
                            <div className='flex items-center gap-2 justify-self-end'>
                                <button 
                                    className='bg-white/50 p-1 rounded-md cursor-pointer hover:scale-105'
                                    onClick={() => handleRemove(product._id || '')}>
                                    <Image
                                        src='/icon/delete.png'
                                        height={35}
                                        width={35}
                                        alt='Delete product'
                                        className='object-contain'/>
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                :
                    <p>Still Empty...</p>
            }</>
        }</div>
    )
}

export default Favourite