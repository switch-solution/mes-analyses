import { Security } from "@/src/classes/security";
import { User } from "@/src/classes/user";
import { Container, ContainerBreadCrumb } from "@/components/layout/container";
import EditUserEnvironnement from "@/components/form/user_environnement/editUserEnvironnement";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page() {
    const security = new Security()
    const userIsValid = await security.userIsValid()
    if (!userIsValid) {
        throw new Error("Vous devez être connecté pour accéder à cette page")
    }
    const user = new User(security.userId)
    if (!user) {
        throw new Error("Vous n'êtes pas connecté")
    }
    const client = await user.getMyClientActive()
    const software = await user.getMySoftwareActive()
    const softwares = await user.getMySoftwaresAll()
    const clients = await user.getMyClientsAll()
    const clientsMap = clients.map((client) => {
        return {
            slug: client.client.slug,
            socialReason: client.client.socialReason,
            siren: client.client.siren
        }
    })
    const softwaresMap = softwares.map((software) => {
        return {
            slug: software.software.slug,
            label: software.software.label
        }
    })
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <EditUserEnvironnement clientActive={client.clientSlug} softwareActive={software.softwareSlug} clients={clientsMap} softwares={softwaresMap} />
        </Container>
    )
}