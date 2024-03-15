"use client"

import { ColumnDef } from "@tanstack/react-table"
export type Dsn = {
    projectSlug: string | null
    clientSlug: string | null
    siret: string | null
    date: string | null
    id: string | null
    value: string | null,
    label: string | null
}

export const columns: ColumnDef<Dsn>[] = [
    {
        accessorKey: "siret",
        header: "SIRET",

    },
    {
        accessorKey: "date",
        header: "Date",

    },
    {
        accessorKey: "id",
        header: "Structure",

    },
    {
        accessorKey: "label",
        header: "Libellé",

    },
    {
        accessorKey: "value",
        header: "Valeur de la DSN",
    },

]

