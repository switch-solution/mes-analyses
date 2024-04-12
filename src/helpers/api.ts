import { env } from "@/lib/env";

export const sendEmail = async (options: RequestInit = {}) => {
    const domain = env.DOMAIN
    const api = env.API_KEY
    const fetchUrl = `${domain}/api/send`
    const response = await fetch(fetchUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api}`,
        },
        ...options,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();

}

