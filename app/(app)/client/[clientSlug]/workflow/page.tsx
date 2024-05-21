import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container"
import { Client } from "@/src/classes/client"
import { Security } from "@/src/classes/security"
import { notFound } from "next/navigation"
import Link from "next/link"
import { DataTable } from "@/components/layout/dataTable";
import { columns } from "./dataTablecolumns"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { User } from "@/src/classes/user"
export default async function Page({ params }: {
    params: { clientSlug: string }

}) {
    const security = new Security()
    const userIsValid = await security.userIsValid()
    if (!userIsValid) {
        throw new Error('Vous n\'êtes pas autorisé à accéder à cette page')
    }
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        notFound()
    }
    const user = new User(security.userId)
    const validationsList = await user.getMyValidation()
    const validations = validationsList.map(validation => {
        return {
            label: validation.Project_Page.label,
            response: validation.response,
            id: validation.projectPageId,
            userId: validation.userId,
            clientSlug: params.clientSlug,
            projectSlug: validation.Project_Page.Project.slug,
            validationSlug: validation.slug,
            pageSlug: validation.Project_Page.slug
        }

    })
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb className="flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/home">Accueil</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={validations} inputSearch="lastname" inputSearchPlaceholder="Chercher par nom" />
            </ContainerDataTable>
        </Container>
    )

}