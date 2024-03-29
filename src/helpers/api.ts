import { env } from "@/lib/env";

export const apiFetch = async (url: string, options: RequestInit = {}) => {
    const domain = env.DOMAIN
    const api = env.API_KEY
    const fetchUrl = `${domain}${url}`
    const response = await fetch(fetchUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': api
        },
        ...options,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();

}

