import { getIdcc } from "@/src/query/idcc.query"
import { getSoftwareItemsBySlug } from "@/src/query/software_Items.query"
import { Client } from "@/src/classes/client"
import { Security } from "@/src/classes/security"
export default async function Page({ params }: { params: { slug: string } }) {
    const client = new Client(params.slug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userId = await security.isEditorClient(clientExist.siren)
    if (!userId) {
        throw new Error('not authorized')
    }
    const item = await getSoftwareItemsBySlug(params.slug)
    const idccList = await getIdcc()
    return (
        <div className="container mx-auto py-10">
            <p>test</p>
        </div>
    )

}