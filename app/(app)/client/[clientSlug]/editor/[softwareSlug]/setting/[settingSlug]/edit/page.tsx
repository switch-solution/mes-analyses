import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getSoftwareSettingBySlug } from "@/src/query/software_setting.query";
import EditSoftwareSetting from "@/components/form/software_setting/editSoftwareSetting";
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, settingSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsEditor = await security.isEditorClient(clientExist.siren)
    if (!userIsEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const setting = await getSoftwareSettingBySlug(params.settingSlug)
    return (<Container>
        <ContainerBreadCrumb>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/`}>Editeur</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/setting`}>Paramètres</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
        </ContainerBreadCrumb>
        <ContainerForm>
            <EditSoftwareSetting clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} setting={setting} />
        </ContainerForm>
    </Container>)
}