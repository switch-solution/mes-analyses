import { getMyBookEditable } from "@/src/query/editor.query"
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

import Link from "next/link"
import { Pencil, Eye, Trash2Icon } from "lucide-react"


export default async function Page() {
    const softwareBooks = await getMyBookEditable()
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Titre du document</TableHead>
                    <TableHead>Logiciel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ouvrir</TableHead>
                    <TableHead>Editer</TableHead>
                    <TableHead>Supprimer</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {softwareBooks.map((software) => software.Standard_Book.map((book) =>
                    <TableRow key={book.id}>
                        <TableCell className="font-medium"><Link href={`/editor/book/${book.id}`}>{book.name}</Link></TableCell>
                        <TableCell >{software.name}</TableCell>
                        <TableCell><Badge variant={book.status === "actif" ? "default" : "destructive"}>{book.status}</Badge></TableCell>
                        <TableCell><Link href={`/editor/book/${book.id}`}> <Eye /></Link></TableCell>
                        <TableCell><Link href={`/editor/book/${book.id}/edit`}> <Pencil /></Link></TableCell>
                        <TableCell><Link href={`/editor/book/${book.id}`}> <Trash2Icon /></Link></TableCell>

                    </TableRow>))}
            </TableBody>
        </Table>
    )




}