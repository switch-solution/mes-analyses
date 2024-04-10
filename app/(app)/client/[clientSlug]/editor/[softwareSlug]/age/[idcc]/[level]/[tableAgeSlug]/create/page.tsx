import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import { Slash } from "lucide-react"
import { getIdccByCode } from "@/src/query/idcc.query";
import CreateTableAgeRow from "@/components/form/table_age/createTableAgeRow";
import { getTableAgeByLevelAndIdccAndSlug } from "@/src/query/table_age.query";
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
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string, level: 'logiciel' | 'client', tableAgeSlug: string, } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const isEditor = await security.isEditorClient(clientExist.siren);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idccExist = await getIdccByCode(params.idcc)
    if (!idccExist) throw new Error("IDCC non trouvé")
    const tableExist = await getTableAgeByLevelAndIdccAndSlug(params.level, params.idcc, params.tableAgeSlug)
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}/${params.level}/${params.tableAgeSlug}`}>{tableExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}/${params.level}/${params.tableAgeSlug}/create`}>Créer une ligne</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <CreateTableAgeRow clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} idcc={params.idcc} level={params.level as "logiciel" | "client"} tableAgeSlug={params.tableAgeSlug} />
        </Container>
    )

}