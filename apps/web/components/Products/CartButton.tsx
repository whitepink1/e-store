'use client'
import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import { handleCartAction } from '../../app/actions/user';

interface CartButtonProps {
    variant: number;
    id: string;
    isInCart: boolean;
    stock: number | undefined;
}

const CartButton = ({id, variant, isInCart, stock = 0}: CartButtonProps) => {
    const [inCart, setInCart] = useState(isInCart);
    
    useEffect(() => {
        setInCart(isInCart);
    }, [isInCart]);

    const handleCart = async () => {
            if (stock < 1) return;
            setInCart((prev) => !prev);
            try {
                const result = await handleCartAction(id, variant);
                if (!result.success) {
                    setInCart((prev) => !prev);
                    alert(result.message || "Updating cart failed");
                } else {
                    window.dispatchEvent(new Event('cart-updated'));
                }
                } catch(err) {
                    console.log(err);
                }
    };
    return (
        <Button 
            onClick={handleCart} 
            variant='blackFill' 
            className={`lg:w-56 max-md:w-[45%] max-sm:w-full ${stock < 1 ? 'disabled bg-gray-20/75 hover:bg-gray-20/70' : inCart ? 'bg-red-500/75 hover:bg-red-500/80' : ''}`}>
                {inCart ? 'Remove' : 'Add to Cart'}
        </Button>
    )
}

export default CartButton;