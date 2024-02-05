"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClientSoftware = {
    id: string | null
    civility: string | null
    firstname: string | null
    lastname: string | null
    open: string | null
    edit: string | null
    delete: string | null

}

export const columns: ColumnDef<ClientSoftware>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "civility",
        header: "Civilité",
    },
    {
        accessorKey: "lastname",
        header: "Nom",
    },
    {
        accessorKey: "firstname",
        header: "Prénom",
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

