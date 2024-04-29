"use client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ButtonExportXlsx } from "@/components/button/excelButtonFile"
import { ButtonExportCsv } from "@/components/button/csvButtonFile"
export type Processus = {
    projectSlug: string
    clientSlug: string
    slug: string
    count: number
    label: string | null
    data: {}[]
    archived: {}[]

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
        id: "csv",
        header: "Extraction au format CSV",
        cell: ({ row }) => {
            const data = row.original
            return (
                <ButtonExportCsv data={data.data} />
            )
        },
    },
    {
        id: "excel",
        header: "Extraction au format Excel (xlsx)",
        cell: ({ row }) => {
            const data = row.original
            return (
                <ButtonExportXlsx data={data.data} />
            )
        },
    },

]

