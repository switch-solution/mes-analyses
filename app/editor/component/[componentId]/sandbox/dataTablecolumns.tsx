"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Invoice = {
    id: string | null
    code: string | undefined
    label: string | undefined
    description: string | undefined
    open: string | null
    edit: string | null
    delete: string | null

}

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "Intitulé",
    },
    {
        accessorKey: "description",
        header: "Description",
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

