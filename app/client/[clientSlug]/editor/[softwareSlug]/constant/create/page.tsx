
import { userIsEditorClient } from "@/src/query/security.query"
import Container from "@/components/layout/container";
import CreateConstant from "@/components/form/software_constant/createSoftwareConstant"
import { getIdcc } from "@/src/query/idcc.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Ce logiciel n'existe pas.")
    }
    const idcc = await getIdcc()
    return (<Container>
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
                    <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/constant`}>Constante</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
            </BreadcrumbList>
        </Breadcrumb>
        <CreateConstant clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} idcc={idcc} />
    </Container>)

}