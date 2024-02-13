import { userIsValid } from "@/src/query/security.query"
export default async function Page({ params }: { params: { projectId: string } }) {
    const userId = await userIsValid()

    if (!userId) {
        throw new Error('Vous devez etre connecté')
    }

    return (<div>User</div>)
}