import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/DataTable";
import { userIsValid } from "@/src/query/security.query";
import { getSoftwareByUserIsEditor } from "@/src/query/software.query";
import { getStdComponent } from "@/src/query/stdcomponent.query";
import { getMyClient } from "@/src/query/user.query";

export default async function Page() {

    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    }
    const stdComponentList = await getStdComponent()
    const clientId = await getMyClient()
    if (!clientId) throw new Error('Vous devez avoir un client')
    const softwares = await getSoftwareByUserIsEditor()

    const stdComponent = stdComponentList.map((std) => {
        return {
            id: std.id,
            title: std.title,
            description: std.description,
            status: std.status,
            software: softwares.find((s) => s.softwareId === std.softwareId)?.software.name || "Inconnu",
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