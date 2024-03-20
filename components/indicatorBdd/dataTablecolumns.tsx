"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Indicator = {
    label: string | null
    count: number

}

export const columns: ColumnDef<Indicator>[] = [
    {
        accessorKey: "label",
        header: "Table",
    },
    {
        accessorKey: "count",
        header: "Nombre de lignes",
    },


]

