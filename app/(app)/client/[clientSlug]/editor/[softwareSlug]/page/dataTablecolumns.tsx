"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
export type Page = {
    clientSlug: string | null
    softwareSlug: string | null
    internalId: string | null
    level: string | null
    label: string | null
    slug: string | null
}

export const columns: ColumnDef<Page>[] = [

    {
        accessorKey: "internalId",
        header: "Code",
    },
    {
        accessorKey: "level",
        header: "Niveau de paramétrage",
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        id: 'link',
        header: 'Ouvrir',
        cell: ({ row }) => {
            const page = row.original
            return <Link href={`/client/${page.clientSlug}/editor/${page.softwareSlug}/page/${page.slug}/edit`}><ArrowRight /></Link >
        }
    }
]

