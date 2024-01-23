import { getChapterBook } from "@/src/query/book.query"
import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { userIsEditorClient } from "@/src/query/security.query"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Pencil, Eye, Trash2Icon } from "lucide-react"
import { notFound } from 'next/navigation';
import { getBookExist, getBookClient } from "@/src/query/book.query"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export default async function BookPage({ params }: { params: { id: string } }) {
    const session = await getAuthSession()
    if (!session?.user?.id) return redirect('/home')
    const userId = session?.user?.id
    const bookExist = await getBookExist(params.id)
    if (!bookExist) return notFound()
    const clientId = await getBookClient(params.id)
    const isEditor = await userIsEditorClient(userId, clientId);
    if (!isEditor) return redirect('/home')
    const chapters = await getChapterBook(params.id)
    return (
        <div className="py-2">
            <Suspense fallback={<Skeleton />}>
                <Table>
                    <TableCaption>Liste des chapitres</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Titre</TableHead>
                            <TableHead>Niveau</TableHead>
                            <TableHead>Nombre de composants</TableHead>
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
                                <TableCell>10</TableCell>
                                <TableCell><Link href={`/editor/book/${params.id}/chapter/${chapter.id}`}> <Eye /></Link></TableCell>
                                <TableCell><Link href={`/editor/book/${params.id}/chapter/${chapter.id}edit`}> <Pencil /></Link></TableCell>
                                <TableCell><Link href={``}> <Trash2Icon /></Link></TableCell>

                            </TableRow>)
                        )}
                    </TableBody>
                </Table>
            </Suspense>
        </div>

    )
}