import BookCreateForm from "@/src/features/form/stdBook/create"
import { getSoftwareUser } from "@/src/query/user.query"
export default async function CreateBook({ params }: { params: { bookId: string } }) {
    const softwares = await getSoftwareUser()
    return (<BookCreateForm softwares={softwares} />)
}