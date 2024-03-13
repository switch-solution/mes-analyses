import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import { getProjectAttachment } from "@/src/query/project_attachment.query"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const attachments = await getProjectAttachment(params.projectSlug)
    return (<div className="flex w-full flex-col justify-center lg:w-2/3">
        <p>test</p>
    </div>)
}