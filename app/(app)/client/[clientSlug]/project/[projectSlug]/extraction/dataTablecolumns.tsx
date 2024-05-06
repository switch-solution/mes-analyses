"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ButtonExportCsv } from "@/components/button/csvButtonFile"
import { ButtonExportXlsx } from "@/components/button/excelButtonFile"
export type Extraction = {
    projectSlug: string
    clientSlug: string
    formTitle: string
    datas: {}[]

}

export const columns: ColumnDef<Extraction>[] = [
    {
        accessorKey: "formTitle",
        header: "Libellé",
    },
    {
        id: "csv",
        header: "Télécharger au format CSV",
        cell: ({ row }) => {
            const extraction = row.original
            return (<ButtonExportCsv data={extraction.datas} />)
        }
    },
    {
        id: "excel",
        header: "Télécharger au format Excel",
        cell: ({ row }) => {
            const extraction = row.original
            return (<ButtonExportXlsx data={extraction.datas} />)
        }
    },


]

