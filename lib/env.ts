import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        GITHUB_ID: z.string().min(1),
        GITHUB_SECRET: z.string().min(1),
        NEXTAUTH_SECRET: z.string().min(1),
        NODE_ENV: z.enum(["development", "production"]),
        ADMIN_EMAIL: z.string().email(),
    },
    client: {
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NODE_ENV: process.env.NODE_ENV,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    },
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    // experimental__runtimeEnv: {
    //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    // }
});