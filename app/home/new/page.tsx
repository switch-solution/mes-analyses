import { columns } from "./dataTablecolumns"
import { userIsValid } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DataTable } from "@/components/layout/dataTable";

export default async function Page() {
    const userIdValid = await userIsValid()
    if (!userIdValid) {
        throw new Error("L'utilisateur n'est pas connecté.")
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
            <DataTable columns={columns} data={[]} inputSearch="project" inputSearchPlaceholder="Chercher par projet" />
        </Container>
    )
}