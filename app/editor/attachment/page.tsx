import { userIsValid } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getSoftwareItems } from "@/src/query/softwareItems.query";
import { getSoftwareByUserIsEditor } from "@/src/query/software.query";
import { getStandardAttachment } from "@/src/query/standardAttachment.query";
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    }
    const attachmentsList = await getStandardAttachment()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    }
    const softwares = await getSoftwareByUserIsEditor()
    const attachments = attachmentsList.map((attachment) => {
        return {
            id: attachment.id,
            software: softwares.find((software) => software.id === attachment.softwareId)?.name || 'Inconnu',
            label: attachment.label,
            description: attachment.description,
            isObligatory: attachment.isObligatory ? 'Oui' : 'Non',
            open: attachment.id,
            edit: attachment.id,
            delete: attachment.id,
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={attachments} href={`/editor/attachment/`} hrefToCreate={`/editor/attachment/create`} searchPlaceholder="Chercher libellé" inputSearch="label" />
        </div>
    )
}