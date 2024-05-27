import { Setting } from "@/src/classes/setting";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
import { Software } from "@/src/classes/software";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { User } from "@/src/classes/user";
import { notFound } from "next/navigation";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, settingSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsEditor = await security.isEditorClient(clientExist.siren)
    if (!userIsEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const user = new User(security.userId)

    const software = new Software(params.softwareSlug)
    const softwareExist = await software.softwareExist()
    if (!softwareExist) {
        notFound()
    }
    const setting = new Setting(params.settingSlug)
    const valuesList = await setting.getValue()
    const values = valuesList.map((value) => {
        return {
            ...value,
            clientSlug: clientExist.slug,
            softwareSlug: softwareExist.slug,
            settingSlug: setting.settingSlug,
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
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/setting`}>Paramètres</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={values} inputSearch="code" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/setting/${params.settingSlug}/create`} buttonLabel="Ajouter une valeur" />
            </ContainerDataTable>
        </Container>
    )

}