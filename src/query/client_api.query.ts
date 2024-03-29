import { prisma } from "@/lib/prisma";
import { getClientBySlug } from "./client.query";

export const getApiByClientSlug = async (clientSlug: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const api = await prisma.client_API.findMany({
            where: {
                clientId: clientExist.siren
            },
            include: {
                _count: {
                    select: { Client_API_Activity: true }

                }
            }
        })
        return api
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue")
    }

}

