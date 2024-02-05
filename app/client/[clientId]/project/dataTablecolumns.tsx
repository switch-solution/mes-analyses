"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
    id: string | null
    software: string | null
    name: string | null
    status: string | null,
    description: string | null
    open: string | null
    edit: string | null
    delete: string | null

}

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "name",
        header: "Nom",
    },
    {
        accessorKey: "description",
        header: "description",
    },
    {
        accessorKey: "status",
        header: "status",
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

