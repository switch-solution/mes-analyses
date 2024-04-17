"use client"

import { ColumnDef } from "@tanstack/react-table"

export type API = {
    clientSlug: string | null
    url: string | null
    createdAt: string | null

}

export const columns: ColumnDef<API>[] = [

    {
        accessorKey: "url",
        header: "Url",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },

]

