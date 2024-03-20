import { env } from "@/lib/env";

export const apiFetch = async (url: string, options: RequestInit = {}) => {
    const domain = env.DOMAIN
    const api = env.API_KEY
    const response = await fetch(`${domain}/${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api
        },
        ...options,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();

}