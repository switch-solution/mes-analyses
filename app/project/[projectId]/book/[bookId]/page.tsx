import { getBookChapter } from "@/src/query/book.query"
export default async function Page({ params }: { params: { projectId: string, bookId: string } }) {
    const chapters = await getBookChapter(params.bookId)
    return <p>{JSON.stringify(chapters)} : {params.bookId}</p>
}