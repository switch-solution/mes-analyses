import { userIsValid } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import EditUserEnvironnement from "@/components/form/user_environnement/editUserEnvironnement";
import { getMySoftware, getMyClient, getMyClientActive, getMySoftwareActive } from "@/src/query/user.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error("Vous n'êtes pas connecté")
    }
    const client = await getMyClientActive()
    const software = await getMySoftwareActive()
    const clients = await getMyClient()
    const softwares = await getMySoftware()

    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <EditUserEnvironnement clientActive={client} softwareActive={software} clients={clients} softwares={softwares} />
        </Container>
    )
}