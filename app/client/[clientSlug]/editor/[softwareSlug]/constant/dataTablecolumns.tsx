"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Idcc = {
    clientSlug: string | null
    softwareSlug: string | null
    code: string | null
    label: string | null
    open: string | null
}

export const columns: ColumnDef<Idcc>[] = [

    {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => {
            return (<Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/constant/${row.original.code}`}>{row.original.code}</Link>)
        }
    },
    {
        accessorKey: "label",
        header: "label",
    },
    {
        id: "open",
        header: "Ouvrir",
        cell: ({ row }) => {
            return (
                <Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/constant/${row.original.code}`}>
                    <ArrowRight size={24} />
                </Link>
            )
        }
    }

]

