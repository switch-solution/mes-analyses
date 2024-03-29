import { getUsersIsBillableDetail } from "@/src/query/client.query";
import { getClientIdByApiKey } from "@/src/query/security.query";
export async function GET(request: Request) {
    try {
        const api = request.headers.get('Authorization')
        if (!api) return Response.json({ message: "Unauthorized" }, { status: 401 })
        const clientId = await getClientIdByApiKey(api, request.url)
        if (!clientId) return Response.json({ message: "Client not found" }, { status: 404 })
        const users = await getUsersIsBillableDetail(clientId)
        return Response.json({ users })
    } catch (err) {
        return Response.json({ error: "Erreur interne" })

    }

}