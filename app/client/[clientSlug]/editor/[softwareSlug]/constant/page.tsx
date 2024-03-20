import { userIsEditorClient } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getConstantLegal } from "@/src/query/constantLegal.query";
import Container from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getConstantInMyActiveClientAndSoftware } from "@/src/query/software_constant.query";
import { getSoftwareBySlug } from "@/src/query/software.query";

export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Ce logiciel n'existe pas.")
    }
    const constantsLegalList = await getConstantLegal()
    const constantsSoftwareList = await getConstantInMyActiveClientAndSoftware()
    const constansLegal = constantsLegalList.map((constant) => {
        return {
            code: constant.id,
            clientSlug: params.clientSlug,
            label: constant.label,
            description: constant.description,
            idccCode: constant.idccCode,
            value: constant.value,
            level: constant.level,
            dateStart: constant.dateStart.toLocaleDateString(),
            softwareLabel: 'Tous',
            slug: constant.slug,
            softwareSlug: params.softwareSlug
        }
    })
    const constansSoftware = constantsSoftwareList.map((constant) => {
        return {
            code: constant.id,
            clientSlug: params.clientSlug,
            label: constant.label,
            description: constant.description,
            idccCode: constant.idccCode,
            value: constant.value,
            level: constant.level,
            dateStart: constant.dateStart.toLocaleDateString(),
            softwareLabel: constant.softwareLabel,
            slug: constant.slug,
            softwareSlug: params.softwareSlug

        }
    })
    const allConstants = [...constansLegal, ...constansSoftware]
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
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={allConstants} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/constant/create`} buttonLabel="Ajouter une constante" />
        </Container >
    )
}