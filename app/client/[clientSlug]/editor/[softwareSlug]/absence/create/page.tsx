import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container";
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
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
import { User } from "@/src/classes/user";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsEditor = await security.isEditorClient(clientExist.siren)
    if (!userIsEditor) {
        throw new Error("Vous devez etre connecté pour acceder à cette page.");
    }
    const softwareExist = await getSoftwareBySlug(params.softwareSlug);
    if (!softwareExist) {
        throw new Error("Ce logiciel n'existe pas.");
    }
    const user = new User(security.userId)
    const softwareActive = await user.getMySoftwareActive();
    const clientActive = await user.getMyClientActive();
    const dsn = await getDsnAbsence();
    const counter = await getCounterForMyActiveSoftware({
        clientId: clientActive.clientId,
        softwareLabel: softwareActive.softwareLabel

    });
    const methodOfCalcul = await getParamByIdAndSoftwareActive({
        id: "METHODE_CALCUL_ABSENCE",
        softwareLabel: softwareActive.softwareLabel,
        clientId: clientActive.clientId
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
                <CreateSoftwareAbsence clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} methodOfCalcul={methodOfCalcul} counter={counter} dsnCode={dsn} />
            </ContainerForm>
        </Container>
    )
}
