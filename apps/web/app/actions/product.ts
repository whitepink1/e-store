'use server'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { ProductSchema } from '../../lib/validations/product';

interface GetProductsParams {
  category: string;
  filters: { [key: string]: string | string[] | undefined };
}

export async function createProductAction(formData: any) {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) {
            return {
                success: false,
                error: "unauthorized",
                message: "You must be logged in to create products."
            };
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        const fullData = {
            ...formData,
            userId: decoded.userId
        };

        const validatedFields = ProductSchema.safeParse(fullData);

        if (!validatedFields.success) {
            return { 
                success: false, 
                error: "validation_error", 
                message: "Invalid fields mapping" 
            };
        };

        const response = await fetch(`${BACKEND_URL}/products/add-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(fullData)
        });

        if (response.status === 409) {
            return { 
                success: false, 
                error: "slug_exists", 
                message: "Slug already exist, change the title." 
            };
        };

        if (response.status === 401) {
            return {
                success: false,
                error: "unauthorized",
                message: "Session expired. Please log in again."
            };
        };
        
        const result = await response.json();
        if (!response.ok) {
            return { 
                success: false, 
                error: "server_error", 
                message: result.message || "Creating error" 
            };
        }
        return { success: true, data: result };
    } catch (error: any) {
        console.log('Real error:' + error)
        return { 
            success: false, 
            error: "network_error", 
            message: "Server error" 
        };
    }
};

export async function getProductsAction({ category, filters }: GetProductsParams) {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('category', category);
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach(val => queryParams.append(key, val));
                } else {
                    queryParams.append(key, value);
                }
            }
        });
        const fullUrl = `${BACKEND_URL}/products?${queryParams.toString()}`;
        const response = await fetch(fullUrl, {
            cache: 'no-store' 
        });
        if (!response.ok) {
            let errorMessage = "Fetching error";
            try {
                const errorResult = await response.json();
                errorMessage = errorResult.message || errorMessage;
            } catch {
                errorMessage = `Server responded with status ${response.status}`;
            }
            return { 
                success: false, 
                error: "server_error", 
                message: errorMessage 
            };
        };

        const result = await response.json();
        return { 
            success: true, 
            data: {
                products: result.products,
                totalItems: result.totalItems
            }
        };
    } catch (error: any) {
        return { 
            success: false, 
            error: "network_error", 
            message: error.message || "Network connection failed" 
        };
    }
};

export async function getProductBySlugAction(slug: string) {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    try {
        const response = await fetch(`${BACKEND_URL}/products/${slug}`, {
            cache: 'no-store' 
        });
        if (!response.ok) {
            let errorMessage = "Fetching error";
            try {
                const errorResult = await response.json();
                errorMessage = errorResult.message || errorMessage;
            } catch {
                errorMessage = `Server responded with status ${response.status}`;
            }
            return { 
                success: false, 
                error: "server_error", 
                message: errorMessage 
            };
        };

        const result = await response.json();
        return { 
            success: true, 
            data: result.product,
        };
    } catch (error: any) {
        return { 
            success: false, 
            error: "network_error", 
            message: error.message || "Network connection failed" 
        };
    }
};

export async function getMyProductsAction() {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) {
            return { success: false, error: "unauthorized", message: "Please sign in to proceed!" };
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const userId = decoded.userId;

        const response = await fetch(`${BACKEND_URL}/products/my-products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store' 
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: "server_error", message: result.message || "Products fetching failed." };
        };

        return { success: true, data: result.products };
    } catch(err) {
        console.error("Error in getMyProductsAction:", err);
        return { success: false, error: "network_error", message: "Error during server connection." };
    }
};