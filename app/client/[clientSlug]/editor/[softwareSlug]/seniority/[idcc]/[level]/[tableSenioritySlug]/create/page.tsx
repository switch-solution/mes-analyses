import { userIsEditorClient } from "@/src/query/security.query"
import Container from "@/components/layout/container";
import { Slash } from "lucide-react"
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
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string, level: 'logiciel' | 'client', tableSenioritySlug: string, } }) {
    const isEditor = await userIsEditorClient(params.clientSlug);
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
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/`}>Table des ages</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}`}>{idccExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}/${params.level}/${params.tableSenioritySlug}`}>{tableExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}/${params.level}/${params.tableSenioritySlug}/create`}>Créer une ligne</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <CreateTableSeniorityRow clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} idcc={params.idcc} level={params.level as "logiciel" | "client"} tableSenioritySlug={params.tableSenioritySlug} />
        </Container>
    )

}