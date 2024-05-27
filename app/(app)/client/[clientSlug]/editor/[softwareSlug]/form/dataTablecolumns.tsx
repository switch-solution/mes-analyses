"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ArrowRight, Check, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
export type Form = {
    clientSlug: string | null
    softwareSlug: string | null
    internalId: string | null
    status: string | null
    label: string | null
    slug: string | null
    repository: string | null
}

export const columns: ColumnDef<Form>[] = [

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
        accessorKey: "repository",
        header: "Alimentation du référentiel",
        cell: ({ row }) => {
            const form = row.original
            return (form.repository && < Check />)
        }
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
            const form = row.original
            return <Link href={`/client/${form.clientSlug}/editor/${form.softwareSlug}/form/${form.slug}/edit/`}><Pencil /></Link>
        }
    },
    {
        id: 'link',
        header: 'Ouvrir',
        cell: ({ row }) => {
            const form = row.original
            return <Link href={`/client/${form.clientSlug}/editor/${form.softwareSlug}/form/${form.slug}/`}><ArrowRight /></Link >
        }
    }
]

