import { columns } from "./dataTablecolumns"
import { userIsValid } from "@/src/query/security.query";
import { getEvents } from "@/src/query/user.query";
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
    const last100Events = await getEvents(100)
    console.log(last100Events)
    const events = last100Events.map(event => {
        return {
            project: event.projectLabel,
            level: event.level,
            message: event.message,
            date: event.createdAt.toLocaleDateString()
        }
    })
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
            <DataTable columns={columns} data={events} inputSearch="project" inputSearchPlaceholder="Chercher par projet" />
        </Container>
    )
}