'use client';
import React, { useEffect, useState } from 'react';
import { getMyProductsAction } from '../../app/actions/product';
import { Product } from '../../lib/validations/product';

const MyProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const result = await getMyProductsAction();

                if (result.success && result.data) {
                    setProducts(result.data);
                } else {
                    setError(result.message || "Didn't found any product.");
                }
                console.log(result)
            } catch (err) {
                setError('Server connection error.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isLoading) return <div className="text-gray-500">Products loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div>MyProducts</div>
    )
}

export default MyProducts