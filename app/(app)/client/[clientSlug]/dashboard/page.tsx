import { Security } from "@/src/classes/security";
import { Container, ContainerBreadCrumb } from "@/components/layout/container";
import ProjectChart from "@/components/chart/projectChart";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { projectProcesExtraction, projectProcesExtractionDetail } from "@/src/query/extraction.query";
import ProjectProcessusChart from "@/components/chart/projectProcessusChart";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const security = new Security();
    const user = await security.userIsValid()
    if (!user) {
        throw new Error('L\'utilisateur n\'est pas autorisé dans ce projet')
    }
    const projectsData = await projectProcesExtraction(user.id)
    const projectsProcessus = await projectProcesExtractionDetail(user.id)
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/dashboard`}>Tableau de bord</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <section className="my-4 flex flex-col justify-between gap-3 px-4 md:grid md:grid-cols-2">
                <div className="ml-2 flex h-[300px] w-full flex-col items-center rounded">
                    <span>Avancement des projets</span>
                    <ProjectChart data={projectsData} />
                </div>
                <div className="ml-2 flex h-[300px] w-full flex-col items-center rounded">
                    <ProjectProcessusChart data={projectsProcessus} />

                </div>
                <div className="ml-2 flex h-[300px] w-full flex-col items-center rounded">
                    <ProjectChart data={[{
                        name: 'Page A',
                        uv: 4000,
                        pv: 2400,
                        amt: 2400,
                    },]} />
                </div>
            </section>
        </Container>
    )

}