"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Idcc = {
    clientSlug: string | null
    softwareSlug: string | null
    slug: string | null
    id: string | null
    label: string | null
    level: string | null
    idcc: string | null
}

export const columns: ColumnDef<Idcc>[] = [

    {
        accessorKey: "level",
        header: "Niveau",
        cell: ({ row }) => {
            return (
                <Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/seniority/${row.original.idcc}/${row.original.level}/${row.original.slug}`}>
                    {row.original.level}
                </Link>
            )
        }

    },
    {
        accessorKey: "id",
        header: "Code",

    },
    {
        accessorKey: "label",
        header: "label",
    },

]

