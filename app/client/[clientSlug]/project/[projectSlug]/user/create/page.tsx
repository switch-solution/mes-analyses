import { userIsAdminProject } from "@/src/query/security.query"
import InvitationProjectForm from "@/components/form/projet_invitation/InvitationProjectForm"
import Container from "@/components/layout/container"
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
import { getProjectBySlug } from "@/src/query/project.query"
import { getSoftwareUsers } from "@/src/query/software.query"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAdmin = await userIsAdminProject(params.projectSlug)
    if (!userIsAdmin) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) {
        throw new Error("Le projet n'existe pas.")
    }
    const users = await getSoftwareUsers()
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>Projet</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/user`}>Utilisateurs</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Tabs defaultValue="internal" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="internal">Utilisateur interne</TabsTrigger>
                    <TabsTrigger value="external">Nouvel utilisateur</TabsTrigger>
                </TabsList>
                <TabsContent value="internal">
                    <InvitationInternalProjectForm clientSlug={params.clientSlug} projectSlug={params.projectSlug} users={users} />
                </TabsContent>
                <TabsContent value="external">
                    <InvitationProjectForm clientSlug={params.clientSlug} projectSlug={params.projectSlug} />
                </TabsContent>
            </Tabs>

        </Container>
    )
}