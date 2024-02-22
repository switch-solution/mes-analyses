import { userIsAdminProject } from "@/src/query/security.query"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAdmin = await userIsAdminProject(params.projectSlug)
    if (!userIsAdmin) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    return (<div>test</div>)
}