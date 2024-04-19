"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
export type Form = {
    id: string | null
    clientSlug: string | null
    softwareSlug: string | null
    slug: string | null
    label: string | null
    isCreate: boolean | null
    isEdit: boolean | null
}

export const columns: ColumnDef<Form>[] = [
    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "isCreated",
        header: "Formulaire de création",
    },
    {
        accessorKey: "isEdit",
        header: "Formulaire d'édition",
    },
    {
        id: "open",
        header: "Ouvrir",
        cell: ({ row }) => {
            const form = row.original
            return (
                <Link href={`/client/${form.clientSlug}/editor/${form.softwareSlug}/processus/${form.slug}/form/${form.slug}`}><ArrowRight /></Link>
            )
        },
    },



]

