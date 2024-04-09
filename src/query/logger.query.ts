import { prisma } from "@/lib/prisma";
import z from "zod";
import { EventSchema } from "../helpers/definition";
import { Security } from "../classes/security";
export const createLog = async (data: z.infer<typeof EventSchema>) => {
    try {
        const security = new Security()
        const userId = await security.userIsValid()
        if (!userId) {
            throw new Error("Vous devez etre connecté pour effectuer cette action.")
        }
        const { level, message, scope, clientId, projectLabel } = EventSchema.parse(data)
        await prisma.logger.create({
            data: {
                level: level,
                message: message,
                scope: scope,
                clientId: clientId,
                projectLabel: projectLabel,
                createdBy: userId?.id,
                userId: userId.id
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création de l'évènement.")
    }
}

export const getClientEventsLimitTo100Rows = async (clientId: string) => {
    try {
        const events = await prisma.logger.findMany({
            where: {
                clientId: clientId
            },
            take: 100
        })
        return events
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des évènements.")
    }

}