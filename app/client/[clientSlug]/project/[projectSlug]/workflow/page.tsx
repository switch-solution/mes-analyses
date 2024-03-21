import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsAdminProject } from "@/src/query/security.query";
import { getProjectBySlug } from "@/src/query/project.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Container from "@/components/layout/container";
import { getWorkFlowByProjectSlug } from "@/src/query/project_workflow.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) throw new Error("Projet non trouvé")
    const userIsAdmin = await userIsAdminProject(params.projectSlug)
    if (!userIsAdmin) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const workFlowList = await getWorkFlowByProjectSlug(params.projectSlug)
    const workFlow = workFlowList.map((wf) => {
        return {
            clientSlug: params.clientSlug,
            projectSlug: params.projectSlug,
            bookLabel: wf.bookLabel,
            isValid: wf.isValid,
            comment: wf.comment,
            user: `${wf.user?.UserOtherData?.at(0)?.lastname} ${wf.user?.UserOtherData?.at(0)?.firstname} ` || "",
            bookSlug: wf.Project_Book.slug,
        }
    })

    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/`}>Projets</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={workFlow} inputSearch="lastname" inputSearchPlaceholder="Chercher par nom" href={`/client/${params.clientSlug}/project/${params.projectSlug}/user/create`} buttonLabel="Inviter un utilisateur" />
        </Container>
    )
}