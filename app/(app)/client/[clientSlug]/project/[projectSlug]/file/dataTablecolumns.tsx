"use client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
export type File = {
    projectSlug: string
    clientSlug: string
    pathname: string | null
    downloadUrl: string
    contentType: string | null

}

export const columns: ColumnDef<File>[] = [
    {
        accessorKey: "pathname",
        header: "Libellé",
    },
    {
        accessorKey: "contentType",
        header: "Type de fichier",
    },
    {
        id: "link",
        header: "Télécharger",
        cell: ({ row }) => {
            const file = row.original
            return (<Link href={file.downloadUrl}><ArrowRight /></Link>)
        }
    },


]

