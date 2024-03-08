import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getProjectAttachment } from "@/src/query/project_attachment.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")

    const attachmentsList = await getProjectAttachment(params.projectSlug)
    const attachments = attachmentsList.map((attachment) => {
        return {
            clientSlug: params.clientSlug,
            projectSlug: params.projectSlug,
            label: attachment.label,
            description: attachment.description,
            isObligatory: attachment.isObligatory,
            slug: attachment.slug,
            isDelivered: attachment.isDelivered,
            deliveryDeadline: attachment.deliveryDeadline.toLocaleDateString()
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={attachments} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/project/${params.projectSlug}/attachment/upload`} buttonLabel="Ajouter un fichier" />
        </div>
    )
}