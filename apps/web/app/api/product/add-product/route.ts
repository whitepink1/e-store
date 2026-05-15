'use server'

export async function sendToBackend(formData: any) {
  const BACKEND_URL = process.env.EXTERNAL_BACKEND_URL;
  //const API_TOKEN = process.env.INTERNAL_BACKEND_TOKEN;

  const response = await fetch(`${BACKEND_URL}/products/add-product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) return { error: 'Server error' };
  
  return await response.json();
}