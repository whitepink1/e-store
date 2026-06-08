import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { AddressFormValues, CartItem } from '../../lib/validations/user';
import { Product } from '../../lib/validations/product';
import { getProductsByIdsAction } from '../actions/product';
import CheckoutForm from '../../components/Products/CheckoutForm';

interface CheckoutPayload {
    userId: string;
    address: AddressFormValues[];
    items: CartItem[];
    promo: string;
    bonus: string;
};

const page = async () => {
    const cookieStore = await cookies();
    const checkoutToken = cookieStore.get('checkout_token')?.value;

    if(!checkoutToken) {
        redirect('/profile?tab=cart');
    };
    
    let checkoutData : CheckoutPayload = { userId: '', address: [], items: [], promo: '', bonus: '' };
    let products: Product[] = [];
    try {
        const jwtSecret = process.env.JWT_CHECKOUT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT secret is not defined in Next environment.')
        };

        checkoutData = jwt.verify(checkoutToken, jwtSecret) as CheckoutPayload;

        if (checkoutData.items.length) {
            const uniqueProductIds = Array.from(
                new Set<string>(checkoutData.items.map((item: any) => item.productId.toString()))
            );
            const productsResult = await getProductsByIdsAction(uniqueProductIds);
            if (productsResult.success && productsResult.data) {
                products = productsResult.data;
            } else {
                throw new Error(productsResult.message || "Didn't found any product.");
            }
        };

    } catch(err) {
        console.log('JWT verification failed: ', err);
        redirect('/profile?tab=cart');
    };

    return <CheckoutForm products={products} orderItems={checkoutData.items}/>
}

export default page;