import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getSoftwareByClientId } from "@/src/query/software.query"
import Link from "next/link"
import { Pencil, Eye } from "lucide-react"
import { DeleteButtonSofware } from "@/components/form/software/DeleteButton"
export default async function Software({ params }: { params: { id: string } }) {

    const softwares = await getSoftwareByClientId(params.id)
    return (
        <Table>
            <TableCaption>Liste de vos logiciels</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Editeur</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Ouvrir</TableHead>
                    <TableHead>Editer</TableHead>
                    <TableHead>Supprimer</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {softwares.map((software) => (
                    <TableRow key={software.id}>
                        <TableCell className="font-medium">{software.provider}</TableCell>
                        <TableCell>{software.name}</TableCell>
                        <TableCell><Link href={`/client/${software.id}`}> <Eye /></Link></TableCell>
                        <TableCell><Link href={`/client/${software.clientId}/software/${software.id}/edit`}><Pencil /></Link></TableCell>
                        <TableCell className="text-right">
                            <DeleteButtonSofware id={software.id} />
                        </TableCell>
                    </TableRow>))
                }

            </TableBody>
        </Table>




    )
}