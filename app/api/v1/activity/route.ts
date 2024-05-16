import { Security } from "@/src/classes/security"
import { ClientApi } from "@/src/classes/clientApi"
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const api = request.headers.get('Authorization')
        if (!api) {
            return Response.json({ error: "Unauthorized" })
        }
        const security = new Security()
        security.apiIsValid({
            apiKey: api,
            url: request.url,
            country: request.geo?.country,
            city: request.geo?.city,
            ip: request.ip,
            method: 'GET'
        })
        try {
            const clientApi = new ClientApi(api)
            const activity = await clientApi.actvity()
            return Response.json({ activity })
        } catch (err) {
            console.error(err)
            return Response.json(
                {
                    error: (err as Error).message
                },
                {
                    status: 400
                }
            )
        }

    } catch (err) {
        return Response.json(
            {
                error: (err as Error).message
            },
            {
                status: 500
            }
        )
    }

}