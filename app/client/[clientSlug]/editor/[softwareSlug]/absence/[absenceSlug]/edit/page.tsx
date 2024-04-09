import { Container, ContainerBreadCrumb, ContainerDataTable, ContainerForm } from "@/components/layout/container";
import EditSoftwareAbsence from "@/components/form/software_absence/editSoftwareAbsence";
import { getParamByIdAndSoftwareActive } from "@/src/query/software_setting.query";
import { getDsnAbsence } from "@/src/query/dsn.query";
import { getCounterForMyActiveSoftware } from "@/src/query/software_counter.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
import { getSoftwareAbsenceBySlug } from "@/src/query/software_absence.query";
import { User } from "@/src/classes/user";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, absenceSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()

    const userIsEditor = await security.isEditorClient(params.clientSlug)
    if (!userIsEditor) {
        throw new Error("Vous n'êtes pas autorisé à accéder à cette page")
    }

    const user = new User(security.userId)
    const softwaActive = await user.getMySoftwareActive()
    const clientActive = await user.getMyClientActive()
    const absence = await getSoftwareAbsenceBySlug(params.absenceSlug)

    const dsn = await getDsnAbsence();
    const counter = await getCounterForMyActiveSoftware({
        clientId: clientActive.clientId,
        softwareLabel: softwaActive.softwareLabel
    });
    const methodOfCalcul = await getParamByIdAndSoftwareActive({
        clientId: clientActive.clientId,
        softwareLabel: softwaActive.softwareLabel,
        id: 'test'
    });
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/absence`}>Absences</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                <EditSoftwareAbsence clientSlug={params.clientSlug} absenceSlug={params.absenceSlug} softwareSlug={params.softwareSlug} absence={absence} dsnCode={dsn} counter={counter} methodOfCalcul={methodOfCalcul} />
            </ContainerForm>
        </Container>
    )

}