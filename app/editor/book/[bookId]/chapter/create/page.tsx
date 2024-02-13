import { userIsValid } from "@/src/query/security.query"
import CreateChapter from "@/src/features/form/stdChapter/create"
export default async function Page({ params }: { params: { bookId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté')
    }
    return (<div>
        <CreateChapter bookId={params.bookId} />
    </div>
    )

}