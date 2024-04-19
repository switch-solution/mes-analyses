"use client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import ExcelButtonProcessusFile from "@/components/button/excelButtonProcessus"

export type Processus = {
    projectSlug: string
    clientSlug: string
    slug: string
    label: string | null
    description: string | null
    status: string | null

}

export const columns: ColumnDef<Processus>[] = [
    {
        accessorKey: "label",
        header: "label",
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/processus/${row.original.slug}/`}>{row.original.label}</Link>
        }
    },
    {
        id: "extract",
        header: "Extraction Excel",
        cell: ({ row }) => {
            const processus = row.original
            return (
                <ExcelButtonProcessusFile clientSlug={processus.clientSlug} projectSlug={processus.projectSlug} slug={processus.slug} />
            )
        },
    },

]

