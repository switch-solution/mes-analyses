import CreateSoftwareItem from "@/components/form/softwareItems/create"
import { getIdcc } from "@/src/query/idcc.query"
import { userIsEditor } from "@/src/query/security.query"
import { getMySoftware } from "@/src/query/user.query";
import { getTypeRubrique } from "@/src/query/software_setting.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const softwares = await getMySoftware()
    const idccList = await getIdcc()
    const typeRubrique = await getTypeRubrique(params.clientSlug)
    return (<div>
        <CreateSoftwareItem softwares={softwares} idccList={idccList} typeRubrique={typeRubrique} />

    </div>)
}