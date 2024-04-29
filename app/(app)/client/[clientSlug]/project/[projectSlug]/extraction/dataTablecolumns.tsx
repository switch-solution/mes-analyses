"use client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ButtonExportXlsx } from "@/components/button/excelButtonFile"

export type Processus = {
    projectSlug: string
    clientSlug: string
    slug: string
    count: number
    label: string | null
    data: {}[]

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
        id: "excel",
        header: "Extraction Excel",
        cell: ({ row }) => {
            const data = row.original

            const processus = row.original
            return (
                <ButtonExportXlsx data={data.data} />
            )
        },
    },

]

