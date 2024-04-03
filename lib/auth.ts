import GithubProvider from "next-auth/providers/github"
import { AuthOptions, getServerSession } from "next-auth"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from "./prisma"
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from 'next-auth/providers/email';
import { env } from "./env"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 1 * 60 * 60 * 24, // 1 days
    },
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    username: profile.login,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url
                }
            }

        }),
        GoogleProvider({
            clientId: env.GOOGLE_ID,
            clientSecret: env.GOOGLE_SECRET,
        }),
        EmailProvider({
            from: env.EMAIL_FROM,
            server: {
                host: env.SMTP_HOST,
                port: Number(env.SMTP_PORT),
                auth: {
                    user: env.SMTP_USER,
                    pass: env.SMTP_PASSWORD,
                },
            },
        }),
    ],
    callbacks: {
        session({ session, token, user }) {
            if (!session?.user || !token) {
                return session
            }
            session.user.id = token.sub
            return session
        },

    },
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "" // Hex color code
    }

}
export const getAuthSession = async () => {
    const session = await getServerSession(authOptions)
    return session
}