import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import CreateUser from "@/components/form/user/createUser";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import { User } from "@/src/classes/user";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsAdmin = await security.isAdministratorClient(params.clientSlug);
    if (!userIsAdmin) {
        throw new Error("Vous devez etre admin pour acceder a cette page");
    }
    const user = new User(security.userId)
    const softwares = await user.getMySoftwaresAll();
    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/`}>Client</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/administrator/user`}>Utilisateur</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                </BreadcrumbList>
            </Breadcrumb>
            <CreateUser clientSlug={params.clientSlug} softwares={softwares} />
        </Container>

    )

}