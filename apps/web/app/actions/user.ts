'use server'
import { cookies } from "next/headers";

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