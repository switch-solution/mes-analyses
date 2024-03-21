import { userIsEditorClient } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import CreateSoftwareAbsence from "@/components/form/software_absence/createSoftwareAbsence";
import { getParamByIdAndSoftwareActive } from "@/src/query/software_setting.query";
import { getDsnAbsence } from "@/src/query/dsn.query";
import { getCounterForMyActiveSoftware } from "@/src/query/software_counter.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const userIsEditor = await userIsEditorClient(params.clientSlug)
    if (!userIsEditor) {
        throw new Error("Vous devez etre connecté pour acceder à cette page.");
    }
    const softwareExist = await getSoftwareBySlug(params.softwareSlug);
    if (!softwareExist) {
        throw new Error("Ce logiciel n'existe pas.");
    }
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
            <CreateSoftwareAbsence clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} methodOfCalcul={methodOfCalcul} counter={counter} dsnCode={dsn} />
        </Container>
    )
}
