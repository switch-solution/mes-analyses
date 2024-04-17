"use client"

import { ColumnDef } from "@tanstack/react-table"

export type User = {
    firstname: string | null | undefined
    lastname: string | null | undefined
    civility: string | null | undefined
    status: string | null | undefined,

}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "civilty",
        header: "Civilité",

    },
    {
        accessorKey: "lastname",
        header: "Nom",
    },
    {
        accessorKey: "lastname",
        header: "Prénom",
    },
    {
        accessorKey: "status",
        header: "status",
    },


]

