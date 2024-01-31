import {
    TableCell,
    TableHead,
} from "@/components/ui/table"
import Link from "next/link"
import { Pencil, Eye, Trash2Icon } from "lucide-react"

export function LinkTableCell({ linkToView, linkToEdit, linkToDelete }: { linkToView: string, linkToEdit: string, linkToDelete: string }) {
    return (
        <>
            <TableCell><Link href={linkToView}> <Eye /></Link></TableCell>
            <TableCell><Link href={linkToEdit}> <Pencil /></Link></TableCell>
            <TableCell><Link href={linkToDelete}> <Trash2Icon /></Link></TableCell>

        </>

    )
}

export function LinkTableHead() {
    return (<>
        <TableHead>Ouvrir</TableHead>
        <TableHead>Editer</TableHead>
        <TableHead>Supprimer</TableHead>

    </>)

}

