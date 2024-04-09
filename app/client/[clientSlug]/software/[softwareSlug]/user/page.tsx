import { getSoftwareUsersBySoftwareSlug } from "@/src/query/software.query"
import { columns } from "./dataTablecolumns"
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
import { DataTable } from "@/components/layout/dataTable";
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
    const users = await getSoftwareUsersBySoftwareSlug(params.softwareSlug)
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={users} inputSearch="lastname" inputSearchPlaceholder="Chercher par logiciel" href={`/client/${params.clientSlug}/administrator/software/${params.softwareSlug}/user/create`} buttonLabel="Ajouter un utilisateur" />
        </div>
    )
}