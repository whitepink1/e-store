'use client';
import React, { useEffect, useState } from 'react';
import { deleteProductAction, getMyProductsAction } from '../../app/actions/product';
import { Product } from '../../lib/validations/product';
import Image from 'next/image';

const MyProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const result = await getMyProductsAction();

                if (result.success && result.data) {
                    setProducts(result.data);
                } else {
                    throw new Error(result.message || "Didn't found any product.");
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const result = await deleteProductAction(id);
            if (!result.success) {
                console.log(result.error)
            }
            if (result.success) {
                setProducts(prevProducts => prevProducts.filter(p => p._id !== id));
                window.dispatchEvent(new Event('wishlist-updated'));
            } else {
                alert(result.message || "Something went wrong");
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className='flex flex-col items-start gap-4'>
            {isLoading ?
                <div className="text-gray-500">Products loading...</div>
            :   
                <>
                {products.map(product => (
                    <div key={product.slug} className='grid grid-cols-4 items-center bg-gray-10/45 rounded-lg p-3 lg:w-200'>
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
                                className='bg-white/50 p-1 rounded-md cursor-pointer hover:scale-105'>
                                <Image
                                    src='/icon/edit.png'
                                    height={30}
                                    width={30}
                                    alt='Edit product'/>
                            </button>
                            <button 
                                className='bg-white/50 p-1 rounded-md cursor-pointer hover:scale-105'
                                onClick={() => handleDelete(product._id || '')}>
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
                </>
            }
        </div>
    )
}

export default MyProducts