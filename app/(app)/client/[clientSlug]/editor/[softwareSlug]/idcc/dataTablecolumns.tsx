"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
export type Idcc = {
    id: string | null
    label: string | null
    clientSlug: string | null
}

export const columns: ColumnDef<Idcc>[] = [

    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "label",
    },
    {
        id: "open",
        header: "Ouvrir",
        cell: ({ row }) => {
            const idcc = row.original
            return (
                <Link href={`/client/${idcc.clientSlug}/editor/idcc/${idcc.id}`}><ArrowRight /></Link>
            )
        },
    },


]

