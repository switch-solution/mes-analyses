import { userIsEditorClient } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import Container from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getSoftwareBySlug } from "@/src/query/software.query";
import { getIdccByCode, getConstantByIdcc } from "@/src/query/idcc.query";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string } }) {
    const userIsEditor = await userIsEditorClient(params.clientSlug)
    if (!userIsEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idccExist = await getIdccByCode(params.idcc)
    if (!idccExist) throw new Error("L'IDCC n'existe pas.")
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Ce logiciel n'existe pas.")
    }
    const constantsLegalList = await getConstantByIdcc(params.idcc)
    const constansLegal = constantsLegalList.map((constant) => {
        return (
            constant.ConstantLegal.map((constantLegal) => {
                return {
                    clientSlug: params.clientSlug,
                    id: constantLegal.id,
                    value: constantLegal.value,
                    dateStart: constantLegal.dateStart,
                    label: constantLegal.label,
                    description: constantLegal.description,
                    idccCode: constantLegal.idccCode,
                    level: constantLegal.level,
                    slug: constantLegal.slug,
                    softwareSlug: params.softwareSlug,
                }
            })
        )
    }).flat(1)
    const constantClient = constantsLegalList.map((constant) => {
        return (
            constant.Client_Constant_Legal.map((constantLegal) => {
                return {
                    id: constantLegal.id,
                    clientSlug: params.clientSlug,
                    label: constantLegal.label,
                    description: constantLegal.description,
                    idccCode: constantLegal.idccCode,
                    value: constantLegal.value,
                    level: constantLegal.level,
                    dateStart: constantLegal.dateStart,
                    slug: constantLegal.slug,
                    softwareSlug: params.softwareSlug
                }
            })
        )
    }).flat(1)
    const constansSoftware = constantsLegalList.map((constant) => {
        return (
            constant.Software_Constant_Legal.map((constantLegal) => {
                return {
                    id: constantLegal.id,
                    clientSlug: params.clientSlug,
                    label: constantLegal.label,
                    description: constantLegal.description,
                    idccCode: constantLegal.idccCode,
                    value: constantLegal.value,
                    level: constantLegal.level,
                    dateStart: constantLegal.dateStart,
                    slug: constantLegal.slug,
                    softwareSlug: params.softwareSlug
                }
            })
        )
    }).flat(1)
    const allConstants = [...constansLegal, ...constantClient, ...constansSoftware]
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/constant`}>Convention collective</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/constant/${params.idcc}`}>{idccExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={allConstants} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/constant/${params.idcc}/create`} buttonLabel="Ajouter une constante" />
        </Container >
    )
}