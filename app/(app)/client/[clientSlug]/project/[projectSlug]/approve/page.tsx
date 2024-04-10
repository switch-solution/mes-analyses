import { Container } from '@/components/layout/container'
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Client } from '@/src/classes/client';
import { Security } from '@/src/classes/security';
import { Project } from '@/src/classes/project';
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const projet = new Project(params.projectSlug)
    const projectExist = await projet.projectExist()
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsValidator = await security.isValidatorInThisProject(params.projectSlug)
    if (!userIsValidator) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")

    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/`}>Projets</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist?.slug}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={[]} inputSearch="processusLabel" inputSearchPlaceholder="Chercher par processus" />
        </Container>
    )
}