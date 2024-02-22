import { userIsEditor } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getStandardAttachment } from "@/src/query/standardAttachment.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const attachmentsList = await getStandardAttachment(params.clientSlug)
    const attachments = attachmentsList.map((attachment) => {
        return {
            clientSlug: params.clientSlug,
            label: attachment.label,
            description: attachment.description,
            isObligatory: attachment.isObligatory,
            softwareLabel: attachment.softwareLabel,
            slug: attachment.slug,
            multiple: attachment.multiple,
            accept: attachment.accept

        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={attachments} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/attachment/create`} buttonLabel="Ajouter une PJ" />
        </div>
    )
}