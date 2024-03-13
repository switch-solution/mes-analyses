import Container from "@/components/layout/container"
import { userIsEditor } from "@/src/query/security.query"
import DetailSoftwareInput from "@/components/form/software_Input/detailSoftwareInput"
import { getStandardInputById } from "@/src/query/sofwtare_input.query"
import { getDsnInputs, getOtherInputs } from "@/src/query/input.query"
import { getSoftwareComponentBySoftwareSlug } from "@/src/query/software_component.query"
import { getSoftwareByClientSlugAndSoftwareLabel } from "@/src/query/software.query"
export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string, inputSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const input = await getStandardInputById(params.inputSlug)
    const isDsn = input.isDsnField
    const isOtherData = input.isOtherData
    const inputs = isDsn ? await getDsnInputs() : isOtherData ? await getOtherInputs() : undefined
    const software = await getSoftwareByClientSlugAndSoftwareLabel(params.clientSlug, input.softwareLabel)
    if (!software) throw new Error("Le logiciel n'existe pas")
    const components = await getSoftwareComponentBySoftwareSlug(software.slug)
    return (
        <Container>
            <span>Champ : {input.label}</span>
            <DetailSoftwareInput inputs={inputs} components={components} input={input} clientSlug={params.clientSlug} inputSlug={params.inputSlug} componentSlug={params.componentSlug} />
        </Container>
    )


}