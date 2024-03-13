import { userIsValid } from "@/src/query/security.query"
export default async function Chapter({ params }: { params: { bookId: string, chapterId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté")
    }

    return <div>
        <div className="ml-10 mt-4">
            <p>test</p>
        </div>

    </div>
}