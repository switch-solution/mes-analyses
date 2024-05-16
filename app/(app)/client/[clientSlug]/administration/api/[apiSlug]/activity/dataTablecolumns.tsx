"use client"

import { ColumnDef } from "@tanstack/react-table"

export type API = {
    clientSlug: string | null
    url: string | null
    createdAt: string | null
    ip: string | null
    country: string | null
    city: string | null
    method: string | null

}

export const columns: ColumnDef<API>[] = [

    {
        accessorKey: "url",
        header: "Url",
    },
    {
        accessorKey: "IP",
        header: "Adresse IP",
    },
    {
        accessorKey: "country",
        header: "Pays",
    },
    {
        accessorKey: "city",
        header: "Ville",
    },
    {
        accessorKey: "method",
        header: "Méthode",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },

]

