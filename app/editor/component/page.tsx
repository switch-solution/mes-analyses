import { getStdComponent } from "@/src/query/stdcomponent.query"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Pencil, Eye, Trash2Icon } from "lucide-react"
export default async function Page() {
    const stdcomponents = await getStdComponent()
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Titre du document</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Logiciel</TableHead>
                    <TableHead>Ouvrir</TableHead>
                    <TableHead>Editer</TableHead>
                    <TableHead>Supprimer</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {stdcomponents.map((std) =>
                    <TableRow key={std.id}>
                        <TableCell className="font-medium"><Link href={`/editor/component/${std.id}`}>{std.title}</Link></TableCell>
                        <TableCell >{std.description}</TableCell>
                        <TableCell><Badge variant={std.status === "actif" ? "default" : "destructive"}>{std.status}</Badge></TableCell>
                        <TableCell >{std.software.name}</TableCell>
                        <TableCell><Link href={`/editor/component/${std.id}`}> <Eye /></Link></TableCell>
                        <TableCell><Link href={`/editor/component/${std.id}/edit`}> <Pencil /></Link></TableCell>
                        <TableCell><Link href={`/editor/component/${std.id}`}> <Trash2Icon /></Link></TableCell>

                    </TableRow>
                )}
            </TableBody>
        </Table>

    )
}