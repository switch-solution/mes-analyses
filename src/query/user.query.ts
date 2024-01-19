import { prisma } from "@/lib/prisma"

import { getAuthSession } from "@/lib/auth"

export const getUser = async () => {
    const session = await getAuthSession()
    if (!session?.user.email) {
        return null
    }
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: session.user.email
        }
    })
    return user
}


export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (err) {
        console.error(err)
    }

}

