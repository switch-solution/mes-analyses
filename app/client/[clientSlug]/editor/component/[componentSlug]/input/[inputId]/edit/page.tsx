import { userIsEditor } from "@/src/query/security.query";
import EditStdInput from "@/components/form/software_ComponentInput/edit";
import { getStandardInputById } from "@/src/query/sofwtare_input.query";
import { getInputs } from "@/src/query/input.query";
export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string, inputId: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const input = await getStandardInputById(params.inputId)
    const inputsType = await getInputs()

    return (
        <div>
            <EditStdInput clientSlug={params.clientSlug} componentSlug={params.componentSlug} input={input} inputsType={inputsType} />
        </div>
    )

}