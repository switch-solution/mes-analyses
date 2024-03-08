import { userIsAdminProject } from "@/src/query/security.query"
import InvitationProjectForm from "@/components/form/projet_invitation/InvitationProjectForm"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAdmin = await userIsAdminProject(params.projectSlug)
    if (!userIsAdmin) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    return (
        <div>
            <InvitationProjectForm clientSlug={params.clientSlug} projectSlug={params.projectSlug} />
        </div>
    )
}