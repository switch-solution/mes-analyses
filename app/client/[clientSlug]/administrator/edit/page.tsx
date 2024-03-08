import { userIsAdminClient } from "@/src/query/security.query"
import EditClient from "@/components/form/client/edit"
import { getClientBySlug } from "@/src/query/client.query"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    await userIsAdminClient(params.clientSlug)
    if (!params.clientSlug) throw new Error("Vous devez etre administrateur pour effectuer cette action.")

    const client = await getClientBySlug(params.clientSlug)

    return (
        <div>
            <EditClient slug={params.clientSlug} client={client} />
        </div>
    )

}