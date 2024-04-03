"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OPS = {
    type: string | null
    id: string | null
    label: string | null
    address1: string | null
    codeZip: string | null
    city: string | null

}

export const columns: ColumnDef<OPS>[] = [
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "label",
    },
    {
        accessorKey: "address1",
        header: "Adresse",
    },
    {
        accessorKey: "codeZip",
        header: "Code postal",
    },
    {
        accessorKey: "city",
        header: "Ville",
    },

]

