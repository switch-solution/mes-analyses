import { userIsEditorClient } from "@/src/query/security.query"
import Container from "@/components/layout/container";
import EditSoftwareConstant from "@/components/form/software_constant/editSoftwareConstant";
import { getSoftwareConstantBySlug } from "@/src/query/software_constant.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, constantSlug: string } }) {
    const userIsEditor = await userIsEditorClient(params.clientSlug)
    if (!userIsEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const constant = await getSoftwareConstantBySlug(params.constantSlug)
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Ce logiciel n'existe pas.")
    }
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/constant`}>Constante</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <EditSoftwareConstant clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} constantSlug={params.constantSlug} constant={constant} />
        </Container>

    )

}