import { userIsEditorClient } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import EditSoftwareAbsence from "@/components/form/software_absence/editSoftwareAbsence";
import { getParamByIdAndSoftwareActive } from "@/src/query/software_setting.query";
import { getDsnAbsence } from "@/src/query/dsn.query";
import { getCounterForMyActiveSoftware } from "@/src/query/software_counter.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
import { getSoftwareAbsenceBySlug } from "@/src/query/software_absence.query";
import { Slash } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, absenceSlug: string } }) {
    const userIsEditor = await userIsEditorClient(params.clientSlug)
    if (!userIsEditor) {
        throw new Error("Vous n'êtes pas autorisé à accéder à cette page")
    }
    const software = await getSoftwareBySlug(params.softwareSlug)
    if (!software) {
        throw new Error("Le logiciel n'existe pas")
    }

    const absence = await getSoftwareAbsenceBySlug(params.absenceSlug)

    const dsn = await getDsnAbsence();
    const counter = await getCounterForMyActiveSoftware();
    const methodOfCalcul = await getParamByIdAndSoftwareActive("METHODE_CALCUL_ABSENCE");
    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/absence`}>Absences</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                </BreadcrumbList>
            </Breadcrumb>
            <EditSoftwareAbsence clientSlug={params.clientSlug} absenceSlug={params.absenceSlug} softwareSlug={params.softwareSlug} absence={absence} dsnCode={dsn} counter={counter} methodOfCalcul={methodOfCalcul} />
        </Container>
    )

}