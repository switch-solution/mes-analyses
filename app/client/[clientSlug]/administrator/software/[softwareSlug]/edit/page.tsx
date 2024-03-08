import { userIsAdminClient } from "@/src/query/security.query"
import { getSoftwareBySlug } from "@/src/query/software.query"
import SoftwareEdit from "@/components/form/software/edit"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {

    const isAdmin = await userIsAdminClient(params.clientSlug)
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