import GithubProvider from "next-auth/providers/github"
import { env } from './env'
import { AuthOptions, getServerSession } from "next-auth"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from "./prisma"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { createEvent } from "@/src/query/logger.query"
import type { Event } from "@/src/helpers/type"
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
        // ...add more providers here
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                //Login page : http://localhost:3000/api/auth/signin
                //Verifier si credentials est ok
                if (!credentials?.email || !credentials?.password) {

                    const event: Event = {
                        level: "warning",
                        message: "Echec de connexion, email ou mot de passe manquant",
                        scope: "user",
                        createdBy: ""
                    }
                    await createEvent(event);
                    return null
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { UserOtherData: true }
                })
                if (!user) {
                    const event: Event = {
                        level: "warning",
                        message: "Echec de connexion, utilisateur non trouvé",
                        scope: "user",
                        createdBy: ""
                    }
                    await createEvent(event);
                    return null
                }
                const userPassword = user.UserOtherData.at(0)?.password
                if (!userPassword) {
                    const event: Event = {
                        level: "warning",
                        message: "Echec de connexion, mot de passe erroné",
                        scope: "user",
                        createdBy: user.id
                    }
                    await createEvent(event);
                    return null
                } else {
                    const isValidPassword = await bcrypt.compare(credentials.password, userPassword)
                    if (!isValidPassword) {
                        const event: Event = {
                            level: "info",
                            message: "Connexion réussie",
                            scope: "user",
                            createdBy: user.id
                        }
                        await createEvent(event);
                        return null
                    }
                }
                return user
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

        }

    }
}
export const getAuthSession = async () => {
    const session = await getServerSession(authOptions)

    return session
}