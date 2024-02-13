"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ChapterComponent = {
    id: string | null
    chapter: string | null
    component: string | null
    type: string | null
    open: string | null
    edit: string | null
    delete: string | null

}

export const columns: ColumnDef<ChapterComponent>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "chapter",
        header: "Chapitre",
    },
    {
        accessorKey: "component",
        header: "Libellé",
    },
    {
        accessorKey: "type",
        header: "Type",
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

