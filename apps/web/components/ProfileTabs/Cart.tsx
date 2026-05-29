'use client'

import { useEffect, useState } from "react";
import { CartItem } from "../../lib/validations/user";
import { getCartAction } from "../../app/actions/user";
import { getProductsByIdsAction } from "../../app/actions/product";
import { Product } from "../../lib/validations/product";
import Image from "next/image";

const Cart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const totalAmount = cart.reduce((sum, item) => {
        const selectedProduct = products.find(
            (prod) => prod._id?.toString() === item.productId.toString()
        );

        if (selectedProduct) {
            const variantIndex = Number(item.variantId || 0);
            const price = selectedProduct.variants[variantIndex]?.finalPrice || 0;
            return sum + price * item.quantity;
        }

        return sum;
    }, 0);

    useEffect(() => {
            const fetchProducts = async () => {
                try {
                    setIsLoading(true);
                    const result = await getCartAction();
                    if (result.success && result.cart) {
                        setCart(result.cart);
                        const uniqueProductIds = Array.from(
                            new Set<string>(result.cart.map((item: any) => item.productId.toString()))
                        );

                        if (uniqueProductIds.length === 0) {
                            setProducts([]);
                            return;
                        };
                        const productsResult = await getProductsByIdsAction(uniqueProductIds);
                        if (productsResult.success && productsResult.data) {
                            setProducts(productsResult.data);
                        } else {
                            throw new Error(productsResult.message || "Didn't found any product.");
                        }
                    } else {
                        throw new Error(result.message || "Didn't found any cart.");
                    }
                } catch (err) {
                    console.log(err)
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchProducts();
    }, []);
    if(isLoading) return <p>Cart is loading...</p>
    return (
        <div className="flex flex-col items-center justify-center mx-auto my-10 2xl:flex-row 2xl:gap-12 2xl:my-28">
            <div className="flex flex-col items-start">
                <h2 className="text-2xl font-semibold mb-10">Shopping Cart</h2>
                {cart.length > 0 ?
                    cart.map((item, index) => {
                        const selectedProduct = products.find(prod => prod._id?.toString() === item.productId.toString());
                        const currentVariant = selectedProduct?.variants[Number(item.variantId)] || selectedProduct?.variants[0];
                        
                        return (
                            <div key={index} className={`w-140 grid grid-cols-7 items-center gap-2 pt-4 pb-8 mb-6 not-last:border-b not-last:border-white-250`}>
                                <Image
                                    src={currentVariant?.images[0] || ''}
                                    height={90}
                                    width={90}
                                    alt={selectedProduct?.slug || ''}
                                    className='rounded-lg'/>
                                <div className="flex flex-col justify-center pl-3 col-span-2">
                                    <p className='text-base font-medium'>{selectedProduct?.title}</p>
                                    <p className='text-sm leading-6'>#{selectedProduct?.slug}</p>
                                </div>
                                <div className="flex items-center gap-2 col-span-2">
                                    <button className="w-6 h-6 text-xl font-medium cursor-pointer">-</button>
                                    <p className="py-2 px-4 border border-white-200 rounded-sm">{item.quantity}</p>
                                    <button className="w-6 h-6 text-lg font-medium cursor-pointer">+</button>
                                </div>
                                <p>$ {(currentVariant?.finalPrice || 0) * item.quantity}</p>
                                <div className='flex items-center gap-2 justify-self-end'>
                                    <button 
                                        className='bg-white/50 p-1 rounded-md cursor-pointer hover:scale-105'
                                        onClick={() => {}}>
                                        <Image
                                            src='/icon/delete-x.png'
                                            height={24}
                                            width={24}
                                            alt='Delete product'
                                            className='object-contain'/>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                :
                <p>Your cart is empty.</p>}
            </div>
            <div className="flex flex-col gap-6 border border-white-150 rounded-[10px] py-14 px-16">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                <div>
                    <label className="text-sm font-medium leading-4 text-gray-70">Discount code / Promo code</label>
                    <input type="text" className='w-full border p-3 pl-4 mt-1 rounded-lg' placeholder="Code" />
                </div>
                <div>
                    <label className="text-sm font-medium leading-4 text-gray-70">Your bonus card number</label>
                    <input type="text" className='w-full border p-3 pl-4 mt-1 rounded-lg' placeholder="Enter Card Number" />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h4 className="text-base font-medium leading-6">Subtotal</h4>
                        <p className="font-medium text-black">$ {totalAmount}</p>
                    </div>
                    <div className="">
                        <p className="w-full flex justify-between text-gray-70 font-base leading-8">Estimated Tax <span className="font-medium text-black">$50</span></p>
                        <p className="w-full flex justify-between text-gray-70 font-base leading-8">Estimated Tax <span className="font-medium text-black">$29</span></p>
                    </div>
                    <div className="flex justify-between">
                        <h4 className="text-base font-medium leading-6">Total</h4>
                        <p className="font-medium text-black">$ {totalAmount + 79}</p>
                    </div>
                    <button></button>
                </div>
            </div>
        </div>
    )
}

export default Cart;