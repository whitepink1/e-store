'use server'

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