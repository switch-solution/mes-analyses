import CreateSoftwareConstant from "@/components/form/software_setting/createSoftwareSetting";
import Container from "@/components/layout/container";
import { userIsEditorClient } from "@/src/query/security.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getSoftwareSettingBySlug } from "@/src/query/software_setting.query";
import EditSoftwareSetting from "@/components/form/software_setting/editSoftwareSetting";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, settingSlug: string } }) {
    const userIsEditor = await userIsEditorClient()
    if (!userIsEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
    }
    const setting = await getSoftwareSettingBySlug(params.settingSlug)
    return (<Container>
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
        <EditSoftwareSetting clientSlug={params.clientSlug} setting={setting} />
    </Container>)
}