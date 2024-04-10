"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Idcc = {
    id: string | null
    label: string | null
}

export const columns: ColumnDef<Idcc>[] = [

    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "label",
    },

]

