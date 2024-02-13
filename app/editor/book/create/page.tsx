import BookCreateForm from "@/src/features/form/stdBook/create"
import { getSoftwareByUserIsEditor } from "@/src/query/software.query"
export default async function CreateBook({ params }: { params: { bookId: string } }) {
    const softwares = await getSoftwareByUserIsEditor()
    return (<BookCreateForm softwares={softwares} />)
}