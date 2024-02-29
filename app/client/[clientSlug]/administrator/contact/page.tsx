import { getUser } from "@/src/query/user.query";
import { userIsAdminClient } from "@/src/query/security.query";
import { getContactsClient } from "@/src/query/client.query";
import { DataTable } from "@/components/layout/dataTable";
import { columns } from "./dataTablecolumns";
export default async function Page({ params }: { params: { clientId: string } }) {
    await getUser()
    await userIsAdminClient(params.clientId)
    const contactsList = await getContactsClient(params.clientId)
    const contacts = contactsList.map((contact) => {
        return {
            id: contact.id,
            civility: contact.civility,
            firstname: contact.firstname,
            lastname: contact.lastname,
            open: contact.id,
            edit: contact.id,
            delete: contact.id,
        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={contacts} href={`/client/${params.clientId}/contact/`} hrefToCreate={`/client/${params.clientId}/contact/create`} searchPlaceholder="Chercher par nom" inputSearch="lastname" />
        </div>
    )



}