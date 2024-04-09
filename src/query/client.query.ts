import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'


export const getCountClientProjects = async (clientSlug: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const countProjects = await prisma.project.count({
            where: {
                clientId: clientExist.siren
            }
        })
        return countProjects

    } catch (err) {
        console.error(err)
    }

}



export const getCountMySoftware = async (clientSlug: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const countSoftwares = await prisma.software.count({
            where: {
                clientId: clientExist.siren
            }
        })
        return countSoftwares
    } catch (err) {
        console.error(err)
    }


}

export const getClientBySlug = async (clientSlug: string) => {
    try {
        const client = await prisma.client.findUniqueOrThrow({
            where: {
                slug: clientSlug
            }
        })
        return client
    } catch (err) {
        console.error(err)
        await prisma.logger.create({
            data: {
                level: "error",
                message: `L'utilisateur essaye d'accéder à un cient qui n'existe pas ${clientSlug}`,
                scope: "project",
                createdBy: "system"
            }
        })
        throw new Error("Une erreur est survenue lors de la récupération du client par le slug.")
    }

}

export const getEndTrialClient = async (clientSlug: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)

        const startDate = new Date(clientExist?.dateStartTrial ? clientExist?.dateStartTrial : new Date())
        const endDate = new Date(clientExist?.dateEndTrial ? clientExist?.dateEndTrial : new Date())
        const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());
        const days = diffInMs / (1000 * 60 * 60 * 24);
        const numberDaysBeforeEndTrial = days.toFixed(0)
        return numberDaysBeforeEndTrial
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération de la date de fin d'essai.")


    }
}

export const getClientBySiren = async (siren: string) => {
    try {
        const client = await prisma.client.findUnique({
            where: {
                siren
            }
        })
        return client
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du client.")
    }

}


export const getProjectsByClientId = async (clientId: string) => {
    try {
        const projects = await prisma.project.findMany({
            where: {
                clientId
            }
        })
        return projects
    } catch (err) {
        throw new Error("Une erreur est survenue lors de la récupération des projets du client.")
    }

}

export const getSoftwareByClientId = async (clientId: string) => {
    try {
        const softwares = await prisma.software.findMany({
            where: {
                clientId
            },
            include: {
                Software_Setting: true
            }
        })
        return softwares
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des logiciels du client.")
    }
}


export const getUsersIsBillableDetail = async (clientId: string) => {

    try {

        const userIsBillable = await prisma.userClient.findMany({
            where: {
                clientId,
                isBillable: true,
                isBlocked: false
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        id: true
                    }
                }
            }
        })

        return userIsBillable
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des utilisateurs facturables.")

    }


}



export const getClientSirenBySlug = async (slug: string) => {
    try {
        const siren = await prisma.client.findUniqueOrThrow({
            where: {
                slug
            },
            select: {
                siren: true

            }
        })
        return siren.siren
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération du client`)
    }

}

/**
 * This function return the client slug.
 * @returns 
 */





export const getSoftwareClientList = async (clientSlug: string) => {
    try {
        const idClient = await getClientBySlug(clientSlug)
        const softwareClient = await prisma.software.findMany({
            where: {
                clientId: idClient.siren
            },
            include: {
                client: {
                    select: {
                        slug: true
                    }
                }
            }
        })
        return softwareClient
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des logiciels du client.")
    }

}

export const getUsersClientList = async (slug: string) => {
    try {
        const client = await getClientBySlug(slug)
        const usersClient = await prisma.userClient.findMany({
            where: {
                clientId: client.siren
            },
            include: {
                user: {
                    include: {
                        UserOtherData: true
                    }
                }
            }
        })
        return usersClient
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des utilisateurs du client.")
    }
}

export type getUsersClientList = Prisma.PromiseReturnType<typeof getUsersClientList>;

export const getClientSlugByApiKey = async (apiKey: string) => {
    try {
        const apiKeySplit = apiKey.split(' ')[1]; // Extract the API key from the Authorization header

        const clientApi = await prisma.client_API.findUnique({
            where: {
                apiKey: apiKeySplit
            },
            include: {
                client: {
                    select: {
                        slug: true
                    }
                }
            }
        })
        if (!clientApi) {
            throw new Error("L'api key n'existe pas.")
        }
        return clientApi.client.slug
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du client.")
    }

}


