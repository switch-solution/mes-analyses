import { prisma } from "@/lib/prisma";
import z from "zod";
import { EventSchema } from "../helpers/definition";
export const createEvent = async (data: z.infer<typeof EventSchema>) => {
    try {
        const { level, message, scope, clientId, projectId, createdBy } = EventSchema.parse(data)
        await prisma.logger.create({
            data: {
                level: level,
                message: message,
                scope: scope,
                clientId: clientId,
                projectId: projectId,
                createdBy: createdBy
            }

        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création de l'évènement.")
    }

}