import { userIsAdminClient } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import CreateUser from "@/components/form/user/createUser";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getMySoftware } from "@/src/query/user.query";
import { Slash } from "lucide-react"

export default async function Page({ params }: { params: { clientSlug: string } }) {
    const userIsAdmin = await userIsAdminClient(params.clientSlug);
    if (!userIsAdmin) {
        throw new Error("Vous devez etre admin pour acceder a cette page");
    }
    const softwares = await getMySoftware();
    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/`}>Client</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/administrator/user`}>Utilisateur</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                </BreadcrumbList>
            </Breadcrumb>
            <CreateUser clientSlug={params.clientSlug} softwares={softwares} />
        </Container>

    )

}