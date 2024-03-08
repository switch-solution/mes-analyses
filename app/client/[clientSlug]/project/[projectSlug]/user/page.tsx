import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsAdminProject } from "@/src/query/security.query";
import { getUsersProject } from "@/src/query/project.query";
import Breadcrumb from "@/components/ui/breadcrumb";

export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAdmin = await userIsAdminProject(params.projectSlug)
    if (!userIsAdmin) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const usersList = await getUsersProject(params.projectSlug)

    const users = usersList.map((user) => {
        return (
            user.user.UserOtherData.map(userData => {
                return {
                    image: user.user.image,
                    clientSlug: params.clientSlug,
                    projectSlug: params.projectSlug,
                    firstname: userData?.firstname,
                    lastname: userData?.lastname,
                    isAdmin: user.isAdmin,
                    isEditor: user.isEditor,
                    isValidator: user.isValidator,
                }
            }))

    }).flat(1)

    return (
        <div className="container mx-auto py-10">
            <Breadcrumb />
            <DataTable columns={columns} data={users} inputSearch="lastname" inputSearchPlaceholder="Chercher par nom" href={`/client/${params.clientSlug}/project/${params.projectSlug}/user/create`} buttonLabel="Inviter un utilisateur" />
        </div>
    )
}