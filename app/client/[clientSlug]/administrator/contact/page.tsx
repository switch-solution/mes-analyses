import { getUser } from "@/src/query/user.query";
import { userIsAdminClient } from "@/src/query/security.query";
import { DataTable } from "@/components/layout/dataTable";
import { columns } from "./dataTablecolumns";
export default async function Page({ params }: { params: { clientId: string } }) {
    await getUser()
    await userIsAdminClient(params.clientId)

    return (
        <div className="container mx-auto py-10">
            <p>test</p>
        </div>
    )



}