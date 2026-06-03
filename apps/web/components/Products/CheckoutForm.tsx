'use client'
import { Product } from '../../lib/validations/product'
import { CartItem } from '../../lib/validations/user';
import { useForm } from 'react-hook-form';
import { Order, OrderSchema } from '../../lib/validations/order';
import { zodResolver } from '@hookform/resolvers/zod';

interface CheckoutFormProps {
    products: Product[];
    orderItems: CartItem[];
};

const CheckoutForm = ({products, orderItems}: CheckoutFormProps) => {
    const orderProducts = orderItems.map(item => {
        const sameProduct = products.find(product => product._id === item.productId);
        if (sameProduct) {
            return {...item, price: sameProduct.variants[Number(item.variantId)]?.finalPrice}
        }
    });
    const totalPrice = orderProducts.reduce((sum, product) => {
        return sum + (Number(product?.quantity) * Number(product?.price))
    }, 79);
    console.log(totalPrice)
    const {register, handleSubmit, formState: {errors}} = useForm<Order>({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
            userId: '',
            products: orderProducts || [],
            address: {
                country: "",
                city: "",
                street: "",
                apartment: "",
                postalCode: "",
                phone: "",
            },
            shipment: '',
            totalPrice: totalPrice || 0,
            status: 'Pending',
        },
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