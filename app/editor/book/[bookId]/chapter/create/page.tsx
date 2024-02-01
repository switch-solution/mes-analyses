import CreateChapterForm from "@/src/features/form/stdChapter/create";
import { getChapterBook } from "@/src/query/standard_book.query";
export default async function CreateChapter({ params }: { params: { bookId: string } }) {
    const chapters = await getChapterBook(params.bookId)

    return (<CreateChapterForm bookId={params.bookId} chapters={chapters} />)

}