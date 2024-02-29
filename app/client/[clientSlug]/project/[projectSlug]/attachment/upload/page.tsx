import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import UploadFile from "@/components/form/project_attachment/create"
import { getProjectAttachment } from "@/src/query/project_attachment.query"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const attachments = await getProjectAttachment(params.projectSlug)
    return (<div className="flex flex-col justify-center w-full lg:w-2/3">

        <UploadFile projectSlug={params.projectSlug} attachments={attachments} />
    </div>)
}