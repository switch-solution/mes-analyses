"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Attachment = {
    id: string | null
    software: string | null
    label: string | null
    description: string | null
    status: string | null
    open: string | null
    edit: string | null
    delete: string | null

}

export const columns: ColumnDef<Attachment>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "software",
        header: "Logiciel",
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "status",
        header: "Status",
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

