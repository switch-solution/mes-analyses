import SoftwareForm from "@/components/form/software/create"

import { userIsAdminClient } from "@/src/query/security.query";

export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour acceder à cette page.")
    return (<SoftwareForm clientSlug={params.clientSlug} />)
}