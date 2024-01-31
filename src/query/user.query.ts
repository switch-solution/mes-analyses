import { prisma } from "@/lib/prisma"
import { userIsValid } from "./security.query"
import { getAuthSession } from "@/lib/auth"

export const getUser = async () => {
    //Ajouter une notion si user est actif
    const session = await getAuthSession()
    if (!session?.user.email) {
        return null
    }
    const user = await prisma.user.findUniqueOrThrow({
        select: {
            id: true,
        },
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
/**
 * Return the client of the user
 * @returns 
 */
export const getMyClient = async () => {

    const userId = await userIsValid()
    if (!userId) {
        return null
    }
    const client = await prisma.client.findMany({
        select: {
            socialReason: true,
            siret: true,
            id: true,

        },
        where: {
            UserClient: {
                some: {
                    userId: userId
                }
            }
        }

    })
    return client
}

export const getRoleUser = async () => {
    const userId = await userIsValid()

    if (!userId) {
        throw new Error("Vous n'êtes pas connecté")
    }
    const role = await prisma.userClient.findMany({
        select: {
            isAdministrator: true,
            isEditor: true,
        },
        where: {
            OR: [{
                isAdministrator: true,
                isEditor: true,
            }],
            userId: userId
        }
    })
    return role

}

