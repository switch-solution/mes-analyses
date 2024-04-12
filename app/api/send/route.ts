import { type NextRequest } from 'next/server'
import { EmailTemplate } from '@/components/email/email-invitation';
import { Resend } from 'resend';
import { env } from '@/lib/env';
const resend = new Resend(env.RESEND_API_KEY);
const emaiFrom = env.EMAIL_FROM;
const API_KEY = env.API_KEY;
const domain = env.DOMAIN;
export async function POST(request: NextRequest) {
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
        if (!resend) {
            return Response.json({ error: 'Resend is not set' });
        }
        if (!emaiFrom) {
            return Response.json({ error: 'Email from is not set' });
        }
        const body = await request.json();
        console.log(body);
        if (!body.to) {
            return Response.json({ error: 'Email is required' });
        }
        const data = await resend.emails.send({
            from: emaiFrom,
            to: body.to,
            subject: body.subject,
            text: '',
            react: EmailTemplate({ ...body, domain }),
        });

        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error });
    }
}