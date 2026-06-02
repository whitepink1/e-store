'use server'
import { cookies } from "next/headers";
import { AddressFormValues, CartItem, UpdateNameValues } from "../../lib/validations/user";
import { success } from "zod";

export const getFavouriteAction = async () => {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get('session_token')?.value;
    
            if (!token) {
                return { success: false, error: "unauthorized", message: "Please sign in to proceed." };
            }

            const response = await fetch(`${BACKEND_URL}/favourites`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                cache: 'no-store'
            });

        const result = await response.json();
        if (!response.ok) return { success: false, message: result.message };
        return { success: true, favourites: result.favourites };
        } catch(err) {
            return { success: false, error: "network_error" };
        }
};

export async function handleFavouriteAction(productId: string) {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) {
            return { success: false, error: "unauthorized", message: "Please sign in to proceed." };
        }

        const response = await fetch(`${BACKEND_URL}/favourites/toggle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId }),
            cache: 'no-store'
        });

        const result = await response.json();
        if (!response.ok) return { success: false, message: result.message };
        return { success: true };
    } catch(err) {
        return { success: false, error: "network_error" };
    }
};

export const getUserAction = async () => {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get('session_token')?.value;
    
            if (!token) {
                return { success: false, error: "unauthorized", message: "Please sign in to proceed." };
            }

            const response = await fetch(`${BACKEND_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                cache: 'no-store'
            });

        const result = await response.json();

        if (response.status === 403) {
            return { 
                success: false, 
                error: "wrong_user", 
                message: "Forbidden: You are not allowed to get user data." 
            };
        };

        if (!response.ok) return { success: false, message: result.message };
        return { success: true, data: result };
        } catch(err) {
            return { success: false, error: "network_error" };
        }
};

export async function updateNameAction(data: Partial<UpdateNameValues>) {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get('session_token')?.value;
    
            if (!token) {
                return { success: false, error: "unauthorized", message: "Please sign in to proceed." };
            }

            const response = await fetch(`${BACKEND_URL}/update-name`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
                cache: 'no-store'
            });

        const result = await response.json();

        if (!response.ok) return { success: false, message: result.message };
        return { success: true };
        } catch(err) {
            return { success: false, error: "network_error" };
        }
};

export async function createAddressAction(data: AddressFormValues) {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get('session_token')?.value;
    
            if (!token) {
                return { success: false, error: "unauthorized", message: "Please sign in to proceed." };
            }

            const response = await fetch(`${BACKEND_URL}/create-address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
                cache: 'no-store'
            });

        const result = await response.json();

        if (!response.ok) return { success: false, message: result.message };
        return { success: true };
        } catch(err) {
            return { success: false, error: "network_error" };
        }
};

export async function handleDeleteAddressAction(id: string) {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) {
            return { success: false, error: "unauthorized", message: "Please sign in to proceed." };
        }

        const response = await fetch(`${BACKEND_URL}/delete-address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id }),
            cache: 'no-store'
        });

        const result = await response.json();
        if (!response.ok) return { success: false, message: result.message };
        return { success: true };
    } catch(err) {
        return { success: false, error: "network_error" };
    }
};

export const getCartAction = async () => {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get('session_token')?.value;
    
            if (!token) {
                return { success: false, error: "unauthorized", message: "Please sign in to proceed." };
            }

            const response = await fetch(`${BACKEND_URL}/cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                cache: 'no-store'
            });

        const result = await response.json();
        if (!response.ok) return { success: false, message: result.message };
        return { success: true, cart: result.cart };
        } catch(err) {
            return { success: false, error: "network_error" };
        }
};

export const handleCartAction = async (id: string, variant: number) => {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) {
            return { success: false, error: "unauthorized", message: "Please sign in to proceed." };
        }

        const response = await fetch(`${BACKEND_URL}/cart/toggle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id, variant }),
            cache: 'no-store'
        });

        const result = await response.json();
        if (!response.ok) return { success: false, message: result.message };
        return { success: true , message: result.message, cart: result.cart};
    } catch(err) {
        return { success: false, error: "network_error" };
    }
}

export const initCheckoutAction = async (promo: string, bonus: string, cart: CartItem[]) => {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) {
            return { success: false, error: "unauthorized", message: "Please sign in to proceed." };
        }

        const response = await fetch(`${BACKEND_URL}/checkout-init`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({promo, bonus, cart})
        });

        const result = await response.json();
        if (!response.ok) return {
            success: false,
            message: result.message,
        };

        if (result.checkoutToken) {
            cookieStore.set('checkout_token', result.checkoutToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60,
                path: '/'
            });
        }

        return {success: true, message: 'Checkout init successfull'}
    } catch(err) {
        return {success: false, error: 'network_error'}
    }
}