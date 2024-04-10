import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsEditor = await security.isEditorClient(clientExist.siren)
    if (!userIsEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")



    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={[]} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/item/create`} buttonLabel="Ajouter une rubrique" />
        </div>
    )
}