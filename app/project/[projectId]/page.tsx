import { getProjectBook } from "@/src/query/project.query"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LinkTableCell, LinkTableHead } from "@/src/features/layout/linkTableCell"
export default async function Project({ params }: { params: { projectId: string } }) {
    const projectBook = await getProjectBook(params.projectId)
    console.log(projectBook)
    console.log(projectBook)
    return (
        <Table>
            <TableCaption>Liste de vos cahiers d&apos;analyse</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Titre</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <LinkTableHead />
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    projectBook.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell className="font-medium">{book.name}</TableCell>
                            <TableCell>{book.name}</TableCell>
                            <TableCell><Badge>En attente</Badge></TableCell>
                            <LinkTableCell linkToView={`/project/${params.projectId}/book/${book.id}`} linkToEdit={`/project/${params.projectId}/book/${book.id}/edit`} linkToDelete={`/project/${params.projectId}/book`} />
                        </TableRow>))
                }
            </TableBody>
        </Table>
    )

}