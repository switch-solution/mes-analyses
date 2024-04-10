import { getSoftwareBySlug } from "@/src/query/software.query"
import SoftwareEdit from "@/components/form/software/edit"
import { Client } from "@/src/classes/client"
import { Security } from "@/src/classes/security"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const isAdmin = await security.isAdministratorClient(clientExist.siren)
    if (!isAdmin) {
        throw new Error('User is not admin')
    }
    const softwareDetail = await getSoftwareBySlug(params.softwareSlug)
    const software = {
        label: softwareDetail.label,
        clientSlug: softwareDetail.client.slug,
        slug: softwareDetail.slug

    }
    return (
        <div>
            <SoftwareEdit softwareSlug={params.softwareSlug} software={software} />
        </div>
    )
}