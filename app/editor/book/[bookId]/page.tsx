import { getChapterBook } from "@/src/query/standard_book.query"
import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { userIsEditorClient } from "@/src/query/security.query"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Pencil, Eye, Trash2Icon } from "lucide-react"
import { notFound } from 'next/navigation';
import { getBookExist, getBookClient, countChapterComposant } from "@/src/query/standard_book.query"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export default async function BookPage({ params }: { params: { bookId: string } }) {
    const session = await getAuthSession()
    if (!session?.user?.id) return redirect('/home')
    const userId = session?.user?.id
    const bookExist = await getBookExist(params.bookId)
    if (!bookExist) return notFound()
    const clientId = await getBookClient(params.bookId)
    const isEditor = await userIsEditorClient(userId, clientId);
    if (!isEditor) return redirect('/home')
    const chapters = await getChapterBook(params.bookId)
    const countChapterComponents = await countChapterComposant(params.bookId)
    return (
        <div className="py-2">
            <Suspense fallback={<Skeleton />}>
                <Table>
                    <TableCaption>Liste des chapitres</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Titre</TableHead>
                            <TableHead>Niveau</TableHead>
                            <TableHead>Rang</TableHead>
                            <TableHead>Sous rang</TableHead>
                            <TableHead>Nombre de composant</TableHead>
                            <TableHead>Voir</TableHead>
                            <TableHead>Editer</TableHead>
                            <TableHead>Supprimer</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chapters.map((chapter) => (
                            <TableRow key={chapter.id}>
                                <TableCell className="font-medium">{chapter.label}</TableCell>
                                <TableCell>{chapter.level}</TableCell>
                                <TableCell>{chapter.rank}</TableCell>
                                <TableCell>{chapter.underRank}</TableCell>
                                <TableCell>{countChapterComponents.find((count) => count.chapterId === chapter.id)?.count}</TableCell>
                                <TableCell><Link href={`/editor/book/${params.bookId}/chapter/${chapter.id}`}> <Eye /></Link></TableCell>
                                <TableCell><Link href={`/editor/book/${params.bookId}/chapter/${chapter.id}edit`}> <Pencil /></Link></TableCell>
                                <TableCell><Link href={``}> <Trash2Icon /></Link></TableCell>

                            </TableRow>)
                        )}
                    </TableBody>
                </Table>
            </Suspense>
        </div>

    )
}