import CreateSoftwareSetting from "@/components/form/software_setting/createSoftwareSetting";
import Container from "@/components/layout/container";
import { userIsEditorClient } from "@/src/query/security.query";
import { getMySoftware } from "@/src/query/user.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const userIsEditor = await userIsEditorClient(params.clientSlug)
    if (!userIsEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
    }
    const mySoftwares = await getMySoftware()
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
        <CreateSoftwareSetting clientSlug={params.clientSlug} softwares={mySoftwares} />
    </Container>)
}