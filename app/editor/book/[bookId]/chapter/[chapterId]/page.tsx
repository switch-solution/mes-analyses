import { getChapterStdComponents } from "@/src/query/chapter_composant.query"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { Pencil, Eye, Trash2Icon } from "lucide-react"
import Link from "next/link";
export default async function Chapter({ params }: { params: { chapterId: string, bookId: string } }) {
    const chapterStdComponets = await getChapterStdComponents(params.chapterId)
    console.log(chapterStdComponets)
    return (

        <Table>
            <TableCaption>Liste des composants associés aux chapitres</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Titre</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {chapterStdComponets.map((chapterStdComponet) =>
                    < TableRow key={`${chapterStdComponet.chapterId}_${chapterStdComponet.standardComposantId}`}>
                        <TableCell className="font-medium">{chapterStdComponet.standardComposant.title}</TableCell>
                        <TableCell>{chapterStdComponet.standardComposant.description}</TableCell>
                        <TableCell><Badge variant={chapterStdComponet.standardComposant.status === "actif" ? "default" : "destructive"} >{chapterStdComponet.standardComposant.status}</Badge></TableCell>
                        <TableCell><Link href={`/editor/book/${params.bookId}/chapter/${chapterStdComponet.chapterId}`}> <Eye /></Link></TableCell>
                        <TableCell><Link href={`/editor/book/${params.bookId}/chapter/${chapterStdComponet.chapterId}/edit`}> <Pencil /></Link></TableCell>
                        <TableCell><Link href={`/editor/book/${params.bookId}/chapter/${chapterStdComponet.chapterId}`}> <Trash2Icon /></Link></TableCell>
                    </TableRow>

                )}

            </TableBody>
        </Table>

    )

}