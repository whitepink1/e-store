'use server'
import { cookies } from "next/headers";
import { AddressFormValues, UpdateNameValues } from "../../lib/validations/user";

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