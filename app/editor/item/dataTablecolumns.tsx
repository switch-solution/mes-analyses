"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Items = {
    id: string | null
    code: string | null
    software: string | null
    type: string | null
    label: string | null
    version: string | null
    open: string | null
    edit: string | null
    delete: string | null

}

export const columns: ColumnDef<Items>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "software",
        header: "Logiciel",
    },
    {
        accessorKey: "code",
        header: "Code rubrique",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "label",
        header: "Libellé",
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

