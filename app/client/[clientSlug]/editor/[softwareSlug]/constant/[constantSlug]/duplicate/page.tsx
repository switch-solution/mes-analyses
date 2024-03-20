import { userIsEditorClient } from "@/src/query/security.query"
import Container from "@/components/layout/container";
import DuplicateConstantSoftware from "@/components/form/software_constant/duplicateSoftwareConstant";
import { getSoftwareConstantBySlug } from "@/src/query/software_constant.query";
import { getConstantBySlug } from "@/src/query/constantLegal.query";
import { getMySoftware } from "@/src/query/user.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, constantSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const constant = await getSoftwareConstantBySlug(params.constantSlug)
    const constantLegal = await getConstantBySlug(params.constantSlug)

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
            <DuplicateConstantSoftware clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} constantSlug={params.constantSlug} constant={constant ? constant : constantLegal} />
        </Container>

    )

}