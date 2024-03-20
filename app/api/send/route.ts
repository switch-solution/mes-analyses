import { type NextRequest } from 'next/server'
import { EmailTemplate } from '@/components/email/email-invitation';
import { Resend } from 'resend';
import { env } from '@/lib/env';
const resend = new Resend(env.RESEND_API_KEY);
const emaiFrom = env.EMAIL_FROM;
const API_KEY = env.API_KEY;
export async function POST(request: NextRequest) {
    try {
        const api = request.headers.get('x-api-key');
        if (api !== API_KEY) {
            return new Response(`error: API  `, {
                status: 401,
            })
        }
        if (!resend) {
            return Response.json({ error: 'Resend is not set' });
        }
        if (!emaiFrom) {
            return Response.json({ error: 'Email from is not set' });
        }
        const body = await request.json();
        const data = await resend.emails.send({
            from: emaiFrom,
            to: body.email,
            subject: body.subject,
            text: '',
            react: EmailTemplate({ ...body }),
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}