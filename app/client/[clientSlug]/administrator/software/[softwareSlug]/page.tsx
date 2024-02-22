import { userIsAdminClient } from "@/src/query/security.query"
import { getSoftwareUsers } from "@/src/query/software.query"
import { columns } from "./dataTablecolumns"

import { DataTable } from "@/src/features/layout/dataTable";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {

    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) {
        throw new Error('User is not admin')
    }
    const users = await getSoftwareUsers(params.softwareSlug)
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={users} inputSearch="lastname" inputSearchPlaceholder="Chercher par logiciel" href={`/client/${params.clientSlug}/administrator/software/${params.softwareSlug}/associate`} buttonLabel="Ajouter un utilisateur" />
        </div>
    )
}