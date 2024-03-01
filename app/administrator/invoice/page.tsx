import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getAllInvoices } from "@/src/query/invoice.query";
import { userIsAdminSystem, userIsValid } from "@/src/query/security.query";
export default async function Page() {

    const user = await userIsValid()
    if (!user) throw new Error('Vous devez etre connecté pour accéder à cette page.')
    const userIsAdmin = await userIsAdminSystem()
    if (!userIsAdmin) throw new Error('Vous devez etre administrateur pour accéder à cette page.')
    const invoicesList = await getAllInvoices()
    const invoices = invoicesList.map((invoice) => {
        return {
            socialReason: invoice.socialReason,
            status: invoice.status,
            dateStart: invoice.dateStart.toLocaleDateString(),
            dateEnd: invoice.dateEnd.toLocaleDateString(),
            slug: invoice.slug,
            amount: `${invoice.amount.toFixed(2)} €`,
        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={invoices} inputSearch="status" inputSearchPlaceholder="Chercher par status" href={`/administrator/invoice/create`} buttonLabel="Créer une nouvelle facture" />
        </div>
    )
}