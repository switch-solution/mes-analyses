import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
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
            id: invoice.id,
            socialReason: invoice.socialReason,
            status: invoice.status,
            dateSart: invoice.dateStart.toLocaleDateString(),
            dateEnd: invoice.dateEnd.toLocaleDateString(),
            amount: `${invoice.amount.toFixed(2)} €`,
            open: invoice.id,
            edit: invoice.id,
            delete: invoice.id,

        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={invoices} href={`/`} hrefToCreate={`/administrator/invoice/create`} searchPlaceholder="Chercher par client" inputSearch="socialReason" />
        </div>
    )
}