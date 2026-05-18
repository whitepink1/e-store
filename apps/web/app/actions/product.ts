'use server'

interface GetProductsParams {
  category: string;
  filters: { [key: string]: string | string[] | undefined };
}

export async function createProductAction(formData: any) {
    const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
    //const API_TOKEN = process.env.INTERNAL_BACKEND_TOKEN;
    try {
        const response = await fetch(`${BACKEND_URL}/products/add-product`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify(formData)
        });
        if (response.status === 409) {
            return { 
                success: false, 
                error: "slug_exists", 
                message: "Slug already exist, change the title." 
            };
        }
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
        return { 
            success: false, 
            error: "network_error", 
            message: "Server error" 
        };
    }
}

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
}