//https://www.blocknotejs.org/docs/advanced/nextjs
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import dynamic from "next/dynamic";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
const Editor = dynamic(() => import("@/components/blocknote/blockNote"), { ssr: false });
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const security = new Security();
    const client = new Client(params.clientSlug);
    const clientExist = await client.clientExist();
    if (!clientExist) {
        throw new Error("Client non trouvé");
    }
    const userIsAdmin = await security.isEditorClient(clientExist.siren);
    if (!userIsAdmin) {
        throw new Error("Vous devez etre admin pour acceder a cette page");
    }
    return (
        <Container>
            <ContainerBreadCrumb >
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/home">Accueil</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/editor`}>Editeur</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <Editor clientSlug={params.clientSlug} />

            </ContainerDataTable>
        </Container >
    )

}