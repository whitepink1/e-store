import React from 'react'
import { Product } from '../../lib/validations/product'
import { CartItem } from '../../lib/validations/user';
import { useForm } from 'react-hook-form';
import { Order, OrderSchema } from '../../lib/validations/order';
import { zodResolver } from '@hookform/resolvers/zod';

interface CheckoutFormProps {
    products: Product[];
    orderItems: CartItem[];
}

type CheckoutFormValues = Omit<Order, 'userId' | 'products' | 'totalPrice' | 'createdAt' | 'updatedAt'>;

const CheckoutForm = ({products, orderItems}: CheckoutFormProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm<CheckoutFormValues>({
        resolver: zodResolver(OrderSchema)
    });

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log();
    };
    return (
        <form onSubmit={handleSubmitOrder}>

        </form>
    )
}

export default CheckoutForm