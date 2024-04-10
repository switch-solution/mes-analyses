import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container";
import { getIdccByCode } from "@/src/query/idcc.query";
import { getTableSeniorityByLevelAndIdccAndSlug } from "@/src/query/table_seniority.query";
import CreateTableSeniorityRow from "@/components/form/table_seniority/createTableSeniorityRow";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string, level: 'logiciel' | 'client', tableSenioritySlug: string, } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const isEditor = await security.isEditorClient(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idccExist = await getIdccByCode(params.idcc)
    if (!idccExist) throw new Error("IDCC non trouvé")
    const tableExist = await getTableSeniorityByLevelAndIdccAndSlug(params.level, params.idcc, params.tableSenioritySlug)
    if (!tableExist) throw new Error("Table d'âge non trouvée")
    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/`}>Table des ages</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}`}>{idccExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}/${params.level}/${params.tableSenioritySlug}`}>{tableExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}/${params.level}/${params.tableSenioritySlug}/create`}>Créer une ligne</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <ContainerForm>
                <CreateTableSeniorityRow clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} idcc={params.idcc} level={params.level as "logiciel" | "client"} tableSenioritySlug={params.tableSenioritySlug} />
            </ContainerForm>
        </Container>
    )

}