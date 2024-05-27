"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
export type Idcc = {
    label: string | null
    count: number | null
    clientSlug: string | null
    slug: string | null,
    idcc: string | null
    classification: boolean | null
}

export const columns: ColumnDef<Idcc>[] = [

    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "count",
        header: "Nombre d'enregistrement",
    },
    {
        id: "open",
        header: "Ouvrir",
        cell: ({ row }) => {
            const idcc = row.original
            if (idcc.classification) {
                return (
                    <Link href={`/client/${idcc.clientSlug}/editor/idcc/${idcc.idcc}/classification/${idcc.slug}`}><ArrowRight /></Link>
                )
            } else {
                return (
                    <Link href={`/client/${idcc.clientSlug}/editor/idcc/${idcc.idcc}/${idcc.slug}`}><ArrowRight /></Link>
                )
            }

        },
    },


]

