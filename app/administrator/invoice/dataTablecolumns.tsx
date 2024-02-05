"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Invoice = {
    id: string | null
    socialReason: string | null
    dateSart: string | null
    dateEnd: string | null
    status: string | null
    amount: string | null
    open: string | null
    edit: string | null
    delete: string | null

}

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "socialReason",
        header: "Raison sociale",
    },
    {
        accessorKey: "dateSart",
        header: "Date de début",
    },
    {
        accessorKey: "dateEnd",
        header: "Date de fin",
    },
    {
        accessorKey: "status",
        header: "status",
    },
    {
        accessorKey: "amount",
        header: "Montant",
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

