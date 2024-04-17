import { Client } from "@/src/classes/client"
import { Security } from "@/src/classes/security"
import { notFound } from "next/navigation"
import ApproveCard from "@/components/card/approveCard"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container"
import { User } from "@/src/classes/user"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error("User not found")
    }
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        notFound()
    }
    const user = new User(security.userId)
    const validation = await user.getMyValidation()
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/validation`}>Validation</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <ApproveCard datas={validation} />
            </ContainerDataTable>

        </Container>
    )

}