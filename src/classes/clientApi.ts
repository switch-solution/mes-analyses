import { prisma } from "@/lib/prisma"
export class ClientApi {
    private apiKey: string
    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    private async getApi() {
        try {
            const apiKey = await this.splitApi()
            const api = await prisma.client_API.findUniqueOrThrow({
                where: {
                    apiKey: apiKey
                }
            })
            return api
        } catch (err) {
            console.error(err)
            throw new Error('L\'api key n\'est pas valide')
        }
    }

    async actvity() {
        try {
            const api = await this.getApi()
            const activity = await prisma.client_API_Activity.findMany({
                select: {
                    url: true,
                    ip: true,
                    country: true,
                    city: true,
                    createdAt: true,
                    method: true
                },
                where: {
                    uuidApi: api.uuid
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return activity
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des activités')
        }

    }

    /**
     * API is Bearer token, we need to split it and return the token
     * @param apiKey 
     * @returns 
     */
    async splitApi() {
        try {
            const splitApi = this.apiKey.split('Bearer ')
            if (splitApi.length !== 2) {
                throw new Error('L\'API n\'est pas valide')
            }
            return splitApi[1]
        } catch (err) {
            console.error(err)
            throw new Error('L\'api key n\'est pas valide')
        }
    }


}