import InvitationProjectForm from "@/components/form/projet_invitation/InvitationProjectForm"
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import InvitationInternalProjectForm from "@/components/form/projet_invitation/InvitationInternalProjectForm"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Security } from "@/src/classes/security"
import { Project } from "@/src/classes/project"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        throw new Error("Le projet n'existe pas.")
    }
    const security = new Security()
    const userIsAdmin = await security.isAdministratorInThisProject(params.projectSlug)
    if (!userIsAdmin) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }

    return (
        <Container>
            <ContainerBreadCrumb>
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>Projet</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/user`}>Utilisateurs</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <Tabs defaultValue="internal" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="internal">Utilisateur interne</TabsTrigger>
                    <TabsTrigger value="external">Nouvel utilisateur</TabsTrigger>
                </TabsList>
                <TabsContent value="internal">
                </TabsContent>
                <TabsContent value="external">
                    <InvitationProjectForm clientSlug={params.clientSlug} projectSlug={params.projectSlug} />
                </TabsContent>
            </Tabs>

        </Container>
    )
}