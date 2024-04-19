"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
export type Processus = {
    id: string | null
    clientSlug: string | null
    softwareSlug: string | null
    slug: string | null
    label: string | null
    order: number | null
}

export const columns: ColumnDef<Processus>[] = [
    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "order",
        header: "Ordre",
    },
    {
        id: "open",
        header: "Ouvrir",
        cell: ({ row }) => {
            const processus = row.original
            return (
                <Link href={`/client/${processus.clientSlug}/editor/${processus.softwareSlug}/processus/${processus.slug}`}><ArrowRight /></Link>
            )
        },
    },



]

