import EditSoftwareAccumulation from "components/form/software_accumulation/editSoftwareAccumulation"
import Container from "@/components/layout/container"
import { userIsEditorClient } from "@/src/query/security.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
import { getAccumulationBySlug } from "@/src/query/software_accumulation.query";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, accumulationSlug: string } }) {
    const isEditor = await userIsEditorClient()
    if (!isEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
    }
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Le logiciel n'existe pas.")
    }
    const accumulation = await getAccumulationBySlug(params.accumulationSlug)
    return (
        <Container>
            <EditSoftwareAccumulation clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} accumulationSlug={params.accumulationSlug} accumulation={accumulation} />
        </Container>
    )

}