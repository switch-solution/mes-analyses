import { Security } from "@/src/classes/security"
import { Client } from "@/src/classes/client"
export async function GET(request: Request) {
    try {
        const api = request.headers.get('Authorization')
        if (!api) {
            return Response.json({ error: "Unauthorized" })
        }
        const security = new Security()
        const clientSlug = await security.apiIsValid(api)
        const client = new Client(clientSlug)
        const clientDetail = await client.clientDetail()
        return Response.json({ clientDetail })
    } catch (err) {
        return Response.json({ error: "Erreur interne" })

    }

}