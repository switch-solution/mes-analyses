import { userIsValid } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import Container from "@/components/layout/container"
import { getPrismaSeed } from "@/src/query/prisma.query"
import { DataTable } from "@/components/layout/dataTable"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page() {
    const user = await userIsValid()
    const seed = await getPrismaSeed()
    if (!user) {
        throw new Error("Vous devez etre connecté pour acceder à cette page.")
    }
    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={seed} inputSearch="name" inputSearchPlaceholder="Chercher par libellé" />
        </Container>
    )

}