'use server'
import { cookies } from 'next/headers';
import { LoginFormSchema, RegisterFormSchema } from '../../lib/validations/user';

export async function signUpAction(formData: any) {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    const validatedData = RegisterFormSchema.safeParse(formData);

    if (!validatedData.success) {
        return { 
            success: false, 
            error: "validation_error", 
            message: "Incorrect form data." 
        };
    }

    const { email, password } = validatedData.data;

    try {
        const response = await fetch(`${BACKEND_URL}/sign-up`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });
        if (response.status === 409) {
            return { 
                success: false, 
                error: "email_exists", 
                message: "Email already in use." 
            };
        }
        const result = await response.json();
        if (!response.ok) {
            return { 
                success: false, 
                error: "server_error", 
                message: result.message || "Singing up error" 
            };
        }
        return { success: true, data: result };
    } catch (error: any) {
        return { 
            success: false, 
            error: "network_error", 
            message: "Cannot connect to backend server." 
        };
    }
};

export async function loginAction(formData: any) {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    const validatedFields = LoginFormSchema.safeParse(formData);

    if (!validatedFields.success) {
        return { success: false, error: "validation_error", message: "Invalid fields." };
    };

    const { email, password } = validatedFields.data;

    try {
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }) 
        });

        const result = await response.json();

        if (response.status === 401) {
            return { success: false, error: "invalid_credentials", message: result.message };
        };

        if (!response.ok) {
            return { success: false, error: "server_error", message: "Login failed." };
        };

        if (response.ok && result.token) {
            const cookieStore = await cookies();
            cookieStore.set('session_token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60,
                path: '/',
            });

            return { success: true, user: result.user };
        }
    } catch(err) {
        console.error("Network error during login:", err);
        return { success: false, error: "network_error", message: "Server is unavailable." };
    }
};

export async function logoutAction() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('session_token');
        
        return { success: true };
    } catch (error) {
        console.error("Error during logout:", error);
        return { success: false, error: "Logout failed" };
    }
};