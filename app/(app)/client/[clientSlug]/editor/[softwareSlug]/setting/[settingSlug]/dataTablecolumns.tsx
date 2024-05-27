"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Setting = {
    clientSlug: string | null
    softwareSlug: string | null
    id: string | null,
    label: string | null
    slug: string | null
}

export const columns: ColumnDef<Setting>[] = [

    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        id: "open",
        header: "Ouvrir",
        cell: ({ row }) => {
            const setting = row.original
            return (
                <Link href={`/client/${setting.clientSlug}/editor/${setting.softwareSlug}/setting/${setting.id}`}><ArrowRight /></Link>
            )
        },
    },


]

