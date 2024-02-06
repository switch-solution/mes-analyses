"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StdComponent = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    software: string | null
    open: string | null
    edit: string | null
    delete: string | null

}

export const columns: ColumnDef<StdComponent>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "title",
        header: "Titre",
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
        accessorKey: "software",
        header: "Logiciel",
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

