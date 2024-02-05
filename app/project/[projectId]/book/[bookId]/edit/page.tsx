export default async function EditBookProject({ params }: { params: { projectId: string, bookId: string } }) {
    return (
        <div>
            <h1>Edit book {params.bookId} from project {params.projectId}</h1>
        </div>
    )
}