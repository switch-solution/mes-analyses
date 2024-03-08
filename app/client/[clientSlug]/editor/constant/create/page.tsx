
import { userIsEditor } from "@/src/query/security.query"
import ConstantFormCreate from "@/components/form/constant/create"
import { getMySoftware } from "@/src/query/user.query";
import { getIdcc } from "@/src/query/idcc.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const softwares = await getMySoftware()
    const idcc = await getIdcc()
    return (<div>
        <ConstantFormCreate clientSlug={params.clientSlug} softwares={softwares} idcc={idcc} />
    </div>)

}