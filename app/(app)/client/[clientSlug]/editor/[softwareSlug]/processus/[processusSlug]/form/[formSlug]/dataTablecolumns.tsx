"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
export type Input = {
    id: string | null
    clientSlug: string | null
    softwareSlug: string | null
    slug: string | null
    label: string | null
    processusSlug: string | null
}

export const columns: ColumnDef<Input>[] = [
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
            const input = row.original
            return (
                <Link href={`/client/${input.clientSlug}/editor/${input.softwareSlug}/processus/${input.slug}/form/${input.slug}/input/${input.slug}`}><ArrowRight /></Link>
            )
        },
    },



]

