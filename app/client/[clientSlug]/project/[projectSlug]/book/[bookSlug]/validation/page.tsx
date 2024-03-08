import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getWorkflow } from "@/src/query/project_book_workflow";
import Breadcrumb from "@/components/ui/breadcrumb";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, bookSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug);
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const workFlowList = await getWorkflow(params.bookSlug)
    const workFlows = workFlowList.map((workFlow) => {
        return workFlow.user.UserOtherData.map(userData => {
            return {
                clientSlug: params.clientSlug,
                projectSlug: params.projectSlug,
                bookSlug: params.bookSlug,
                bookLabel: workFlow.bookLabel,
                response: workFlow.response,
                firstname: userData.firstname,
                lastname: userData.lastname,
            }
        })

    }).flat(1)
    return (
        <div className="container mx-auto py-10">
            <Breadcrumb />
            <DataTable columns={columns} data={workFlows} inputSearch="response" inputSearchPlaceholder="Chercher par réponse" />
        </div>
    )
}