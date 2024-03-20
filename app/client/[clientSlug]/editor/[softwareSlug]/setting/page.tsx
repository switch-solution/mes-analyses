import { userIsEditorClient } from "@/src/query/security.query";
import { getSoftwareSettingFilterByUserSoftware } from "@/src/query/software_setting.query";
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

export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")

    const settingList = await getSoftwareSettingFilterByUserSoftware(params.clientSlug)
    const settings = settingList.map((setting) => {
        return {
            clientSlug: params.clientSlug,
            code: setting.id,
            label: setting.label,
            value: setting.value,
            softwareLabel: setting.softwareLabel,
            slug: setting.slug,
            description: setting.description,
            dateStart: setting.dateStart.toLocaleDateString(),
            dateEnd: setting.dateEnd.toLocaleDateString(),
        }
    })

    return (
        <Container>
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
            <DataTable columns={columns} data={settings} inputSearch="code" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/setting/create`} buttonLabel="Ajouter un paramétre" />
        </Container>
    )

}