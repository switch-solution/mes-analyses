import { userIsValid } from "@/src/query/security.query"
import { list } from '@vercel/blob';

export default async function Page({ params }: { params: { projectId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté')

    }
    async function allFile() {
        const blobs = await list();
        return blobs;
    }
    const file = await allFile()
    if (!userId) {
        throw new Error('Vous devez etre connecté')
    }

    return (<div>{JSON.stringify(file)}</div>)
}