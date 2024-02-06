import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/DataTable";
import { userIsValid } from "@/src/query/security.query";
import { getSoftwareByClient } from "@/src/query/software.query";
import { getStdComponent } from "@/src/query/stdcomponent.query";
import { getMyClient } from "@/src/query/user.query";

export default async function Page() {

    const user = await userIsValid()
    const stdComponentList = await getStdComponent()
    const clientId = await getMyClient()
    if (!clientId) throw new Error('Vous devez avoir un client')
    const softwares = await getSoftwareByClient(clientId)

    const stdComponent = stdComponentList.map((std) => {
        return {
            id: std.id,
            title: std.title,
            description: std.description,
            status: std.status,
            software: softwares.find((s) => s.id === std.softwareId)?.name || "Inconnu",
            open: std.id,
            edit: std.id,
            delete: std.id,

        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={stdComponent} href={`/editor/component/`} hrefToCreate={`/editor/component/create`} searchPlaceholder="Chercher titre" inputSearch="title" />
        </div>
    )
}