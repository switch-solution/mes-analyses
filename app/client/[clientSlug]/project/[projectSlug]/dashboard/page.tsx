import { userIsAuthorizeInThisProject } from '@/src/query/security.query'
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorize = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorize) throw new Error("Vous n'avez pas les droits pour acceder à cette page.")
    return (
        <div>test</div>
    )
}