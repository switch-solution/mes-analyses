import CreateInvitation from '@/components/form/invitation/createInvitation'
import { Client } from '@/src/classes/client'
import { Security } from '@/src/classes/security'
import { User } from '@/src/classes/user'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container";

export default async function Page({ params }: { params: { clientSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsAdmin = await security.isAdministratorClient(clientExist.siren)
    if (!userIsAdmin) {
        throw new Error("Unauthorized")
    }
    const user = new User(security.userId)
    const softwaresList = await user.getMySoftwaresAll()
    const softwares = softwaresList.map((software) => {
        return {
            label: software.softwareLabel,
            value: software.softwareLabel
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/`}>Client</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/administrator`}>API</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                <CreateInvitation clientSlug={params.clientSlug} softwares={softwares} />
            </ContainerForm>
        </Container>

    )

}