import { getIdcc } from "@/src/query/idcc.query"
import { getSoftwareItemsBySlug } from "@/src/query/software_Items.query"
import { userIsValid } from "@/src/query/security.query"
export default async function Page({ params }: { params: { slug: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('not authorized')
    }
    const item = await getSoftwareItemsBySlug(params.slug)
    const idccList = await getIdcc()
    return (
        <div className="container mx-auto py-10">
            <p>test</p>
        </div>
    )

}