import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { userIsEditor } from "./security.query";
import { getMyClient } from "./user.query";
export const countStdComponent = async () => {
    try {
        const session = await getAuthSession()
        if (!session) throw new Error('Vous devez être connecté pour effectuer cette action')
        const isEditor = await userIsEditor()
        if (!isEditor) throw new Error('Vous devez être éditeur pour effectuer cette action')
        const userClient = await getMyClient()
        if (!userClient) {
            throw new Error("L'utilisateur n'est associé à aucun client.")
        }
        const count = await prisma.standard_Composant.count({
            where: {
                clientId: {
                    in: userClient.map((client) => client.id)
                }
            }
        })
        return count
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des composants')
    }

}