"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ArrowRight, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
export type Page = {
    clientSlug: string | null
    softwareSlug: string | null
    internalId: string | null
    status: string | null
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
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.original.status
            return <Badge variant="default">{status}</Badge>
        }
    },
    {
        id: "edit",
        header: "Editer",
        cell: ({ row }) => {
            const page = row.original
            return <Link href={`/client/${page.clientSlug}/editor/${page.softwareSlug}/page/${page.slug}/edit/page`}><Pencil /></Link>
        }
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

