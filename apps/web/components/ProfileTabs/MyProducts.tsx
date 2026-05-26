'use client';
import React, { useEffect, useState } from 'react';
import { getMyProductsAction } from '../../app/actions/product';
import { Product } from '../../lib/validations/product';

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

    return (
        <div className='flex flex-col items-start gap-4'>
            {isLoading ?
                <div className="text-gray-500">Products loading...</div>
            :   
                <>
                {products.map(product => (
                    <div key={product.slug} className='w-full bg-gray-10'>
                        1
                    </div>
                ))}
                </>
            }
        </div>
    )
}

export default MyProducts