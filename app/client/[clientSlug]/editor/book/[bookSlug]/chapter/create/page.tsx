import { userIsValid } from "@/src/query/security.query"
import CreateChapter from "@/components/form/software_chapter/create"
export default async function Page({ params }: { params: { clientSlug: string, bookSlug: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté')
    }
    return (<div>
        <CreateChapter clientSlug={params.clientSlug} bookSlug={params.bookSlug} />
    </div>
    )

}