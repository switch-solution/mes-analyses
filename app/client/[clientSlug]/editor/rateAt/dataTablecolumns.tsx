"use client"

import { ColumnDef } from "@tanstack/react-table"

export type RateAt = {
    id: string | null
    label: string | null
    startDate: string | null
    endDate: string | null
}

export const columns: ColumnDef<RateAt>[] = [

    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "label",
    },
    {
        accessorKey: "startDate",
        header: "Date de début",
    },
    {
        accessorKey: "endDate",
        header: "Date de fin",
    },

]

