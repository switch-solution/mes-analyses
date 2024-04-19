import { type NextRequest } from 'next/server'
import { prisma } from "@/lib/prisma";
import { env } from '@/lib/env';
const API_KEY = env.API_KEY;
export async function GET(request: NextRequest) {
    try {
        const api = request.headers.get('authorization');
        if (!api) {
            return new Response(`error: API key is required`, {
                status: 401,
            })
        }
        const splitApi = api.split('Bearer ');
        if (API_KEY !== splitApi.at(1)) {
            return new Response(`error: API  `, {
                status: 403,
            })
        }
        const feedback = await prisma.feedback.findMany()

        return Response.json(feedback);
    } catch (error) {
        console.error(error);
        return Response.json({ error });
    }
}