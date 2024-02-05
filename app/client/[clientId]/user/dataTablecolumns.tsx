"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClientUser = {
    id: string | null
    name: string | null
    image: string | null
    status: string | null
    email: string | null
    open: string | null
    edit: string | null
    delete: string | null

}

export const columns: ColumnDef<ClientUser>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "name",
        header: "Nom",
    },
    {
        accessorKey: "status",
        header: "Facturable",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "image",
        header: "image",
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

