import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        GITHUB_ID: z.string().min(1),
        GITHUB_SECRET: z.string().min(1),
        GOOGLE_ID: z.string().min(1),
        GOOGLE_SECRET: z.string().min(1),
        NEXTAUTH_SECRET: z.string().min(1),
        NODE_ENV: z.enum(["development", "production"]),
        ADMIN_EMAIL: z.string().email(),
        BLOB_READ_WRITE_TOKEN: z.string().min(1),
        SMTP_USER: z.string().min(1),
        SMTP_PASSWORD: z.string().min(1),
        SMTP_HOST: z.string().min(1),
        SMTP_PORT: z.string().min(1),
        EMAIL_FROM: z.string().min(1),
    },
    client: {
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NODE_ENV: process.env.NODE_ENV,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        EMAIL_FROM: process.env.EMAIL_FROM,
    },
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    // experimental__runtimeEnv: {
    //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    // }
});