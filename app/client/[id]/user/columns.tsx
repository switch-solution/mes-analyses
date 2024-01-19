"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClientUser = {
    name: string
    image: string
    email: string
}

export const columns: ColumnDef<ClientUser>[] = [
    {
        accessorKey: "name",
        header: "Nom",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "image",
        header: "image",
    },
]
