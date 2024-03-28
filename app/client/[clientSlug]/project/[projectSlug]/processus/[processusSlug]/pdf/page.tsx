import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import { Pdf } from "@/components/react-pdf/pdf"
import { dataByTable } from "@/src/query/extraction.query"
import { getUserOtherData } from "@/src/query/user.query"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, table: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    //const datas = await dataByTable({ projectSlug: params.projectSlug, table: params.table })
    const user = await getUserOtherData(userIsAuthorized.userId)
    return (
        <p>test</p>
    )
}