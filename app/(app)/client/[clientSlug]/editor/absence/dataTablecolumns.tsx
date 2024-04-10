"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Absence = {
    id: string | null
    label: string | null
}

export const columns: ColumnDef<Absence>[] = [

    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "label",
    },

]

