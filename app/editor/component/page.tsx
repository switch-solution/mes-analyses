import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { userIsValid } from "@/src/query/security.query";
import { getSoftwareByUserIsEditor } from "@/src/query/software.query";
import { getStdComponent } from "@/src/query/stdcomponent.query";

export default async function Page() {

    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    } const softwares = await getSoftwareByUserIsEditor()

    const stdComponentList = await getStdComponent()

    const stdComponent = stdComponentList.map((std) => {
        return {
            id: std.id,
            title: std.title,
            description: std.description,
            status: std.status,
            type: std.type === 'textarea' ? 'Zone de texte' : std.type === 'form' ? 'Formulaire' : 'Image',
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