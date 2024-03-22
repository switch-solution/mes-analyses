import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsEditorClient } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import { Slash } from "lucide-react"
import { Idcc } from "./dataTablecolumns";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getClassificationByIdcc } from "@/src/query/idcc.query";
import { getIdccByCode } from "@/src/query/idcc.query";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string } }) {
    const isEditor = await userIsEditorClient(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idccExist = await getIdccByCode(params.idcc)
    if (!idccExist) throw new Error("IDCC non trouvé")
    const classifications = await getClassificationByIdcc(params.idcc)
    const classificationsStandard = classifications.map((classification) => {
        return (
            classification.Classification.map((standardClassification) => {
                return {
                    clientSlug: params.clientSlug,
                    softwareSlug: params.softwareSlug,
                    idcc: params.idcc,
                    type: standardClassification.type,
                    id: standardClassification.id,
                    level: standardClassification.level,
                    label: standardClassification.label,
                }
            })
        )
    })
    const classicationClient = classifications.map((classification) => {
        return (
            classification.Client_Classification.map((clientClassification) => {
                return {
                    clientSlug: params.clientSlug,
                    softwareSlug: params.softwareSlug,
                    idcc: params.idcc,
                    type: clientClassification.type,
                    id: clientClassification.id,
                    level: clientClassification.level,
                    label: clientClassification.label,
                }
            })
        )
    }).flat(1)
    const classicationSoftware = classifications.map((classification) => {
        return (
            classification.Software_Classification.map((softwareClassification) => {
                return {
                    clientSlug: params.clientSlug,
                    softwareSlug: params.softwareSlug,
                    idcc: params.idcc,
                    id: softwareClassification.id,
                    type: softwareClassification.type,
                    level: softwareClassification.level,
                    label: softwareClassification.label,
                }
            })
        )
    }).flat(1)

    const allClassifications = [...classificationsStandard, ...classicationClient, ...classicationSoftware]
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/classification/`}>Convention collective</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/classification/${params.idcc}`}>{idccExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={allClassifications as Idcc[]} inputSearch="id" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/classification/${params.idcc}/create`} buttonLabel="Créer une nouvelle classification" />
        </Container>
    )
}