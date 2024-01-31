import BookCreateForm from "@/src/features/form/stdBook/create"
import { getSoftwaresClient } from "@/src/query/client.query"
export default async function CreateBook({ params }: { params: { bookId: string } }) {
    const softwares = await getSoftwaresClient(params.bookId)
    return (<BookCreateForm softwares={softwares} />)
}