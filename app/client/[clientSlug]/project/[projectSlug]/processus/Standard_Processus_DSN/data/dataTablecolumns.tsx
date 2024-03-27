"use client"

import { ColumnDef } from "@tanstack/react-table"
export type Dsn = {
    projectSlug: string | null
    clientSlug: string | null
    siret: string | null
    date: string | null
    structure: string | null
    value: string | null
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
        accessorKey: "structure",
        header: "Structure DSN",
    },
    {
        accessorKey: "label",
        header: "Libellé structure DSN",
    },
    {
        accessorKey: "value",
        header: "Valeur DSN",
    },


]

