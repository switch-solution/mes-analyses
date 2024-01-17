import GithubProvider from 'next-auth/providers/github'
import { env } from './env'
import { prisma } from './prisma'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions, getServerSession } from 'next-auth'
export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],
    callbacks: {
        session({ session, user }) {
            if (!session?.user) {
                return session
            }
            session.user.id = user.id
            return session
        }
    }
}


export const getAuthSession = async () => {
    const session = await getServerSession(authOptions)
    return session
}