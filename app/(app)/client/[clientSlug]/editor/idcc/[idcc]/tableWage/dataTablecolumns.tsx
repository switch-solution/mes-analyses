"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
export type TableSeniority = {
    id: string | null
    label: string | null,
    dateStart: string | null,
    dateEnd: string | null | undefined,
    slug: string | null,
    clientSlug: string | null
    idcc: string | null
    extended: boolean | null
}

export const columns: ColumnDef<TableSeniority>[] = [
    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "dateStart",
        header: "Date de début",
    },
    {
        accessorKey: "dateEnd",
        header: "Date de fin",
    },
    {
        accessorKey: "extended",
        header: "Etendu",
    },
    {
        id: "open",
        header: "Ouvrir",
        cell: ({ row }) => {
            const table = row.original
            return (
                <Link href={`/client/${table.clientSlug}/editor/idcc/${table.idcc}/tableWage/${table.slug}/row`}><ArrowRight /></Link>
            )
        },
    },

]

