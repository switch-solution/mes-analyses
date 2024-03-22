"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Idcc = {
    clientSlug: string | null
    softwareSlug: string | null
    idcc: string | null
    type: string | null
    id: string | null
    level: string | null
    label: string | null
}

export const columns: ColumnDef<Idcc>[] = [

    {
        accessorKey: "level",
        header: "Niveau",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "id",
        header: "Code",
        cell: ({ row }) => {
            return (<Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/classification/${row.original.idcc}/${row.original.id}`}>{row.original.id}</Link>)
        }
    },
    {
        accessorKey: "label",
        header: "label",
    },

]

