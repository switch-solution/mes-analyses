import { getSoftwareSettingFilterByUserSoftware } from "@/src/query/software_setting.query";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { User } from "@/src/classes/user";
import { s } from "vitest/dist/reporters-P7C2ytIv.js";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsEditor = await security.isEditorClient(clientExist.siren)
    if (!userIsEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const user = new User(security.userId)
    const softwareActive = await user.getMySoftwareActive()
    const clientActive = await user.getMyClientActive()
    const settingList = await getSoftwareSettingFilterByUserSoftware({
        clientId: clientActive.clientId,
        softwareLabel: softwareActive.softwareLabel
    })
    const settings = settingList.map((setting) => {
        return {
            clientSlug: params.clientSlug,
            code: setting.id,
            label: setting.label,
            value: setting.value,
            softwareLabel: setting.softwareLabel,
            slug: setting.slug,
            description: setting.description,
            softwareSlug: params.softwareSlug
        }
    })

    return (
        <Container>
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
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={settings} inputSearch="code" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/setting/create`} buttonLabel="Ajouter un paramétre" />
            </ContainerDataTable>
        </Container>
    )

}