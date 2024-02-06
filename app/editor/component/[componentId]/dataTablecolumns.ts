"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StdComponentInput = {
    id: string | null
    type: string | null
    label: string | null
    isCode: string | null
    isLabel: string | null
    isDescription: string | null
    order: number | null
    open: string | null
    edit: string | null
    delete: string | null

}

export const columns: ColumnDef<StdComponentInput>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "label",
        header: "Nom du champ",
    },
    {
        accessorKey: "isCode",
        header: "Champ code",
    },
    {
        accessorKey: "isLabel",
        header: "Champ intitulé",
    },
    {
        accessorKey: "isDescription",
        header: "Champ description",
    },
    {
        accessorKey: "order",
        header: "Position",
    },
    {
        accessorKey: "open",
        header: "Ouvrir",
    },
    {
        accessorKey: "edit",
        header: "Editer",
    },
    {
        accessorKey: "delete",
        header: "Supprimer",
    },
]

