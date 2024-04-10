
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import { Processus } from "@/src/classes/processus";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ProcessusFactory } from "@/src/classes/processusFactory";
import AlerteDeleteProjectData from "@/components/alert/alertDeleteProjectData";
import { Project } from "@/src/classes/project";
import { Security } from "@/src/classes/security";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, processusSlug: string, dataSlug: string } }) {
    const security = new Security()
    const userIsAuthorized = await security.isAuthorizedInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) throw new Error("Projet introuvable")
    const projectDetail = await project.projectDetails()
    const processus = new Processus(params.processusSlug)
    const processusExist = await processus.processusExist()
    if (!processusExist) throw new Error("Processus introuvable")
    const processusFactory = ProcessusFactory.create({
        processusSlug: params.processusSlug,
        clientId: projectDetail.clientId,
        projectLabel: projectDetail.label,
        sofwareLabel: projectDetail.softwareLabel

    });
    const datasList = await processusFactory.parentElement(params.dataSlug)

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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectDetail.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus`}>Processus</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${params.processusSlug}`}>{processusExist.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${params.processusSlug}/delete`}>Suppression</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <div className="mt-2">
                <AlerteDeleteProjectData slug={params.dataSlug} processusSlug={params.processusSlug} clientSlug={params.clientSlug} projectSlug={params.projectSlug} />
            </div>
            <div className="mt-2">
                <ContainerDataTable>
                    <Table className='bg-background'>
                        <TableCaption>Liste des données qui vont etre supprimées.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Code</TableHead>
                                <TableHead>Type de donnée</TableHead>
                                <TableHead>Libellé</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {datasList.map((data) => (
                                <TableRow key={data.id}>
                                    <TableCell className="font-medium">{data.id}</TableCell>
                                    <TableCell>{data.type}</TableCell>
                                    <TableCell>{data.label}</TableCell>
                                    <TableCell>{data.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">{datasList.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </ContainerDataTable>
            </div>

        </Container>
    )

}