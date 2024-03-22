"use client"

import { ColumnDef } from "@tanstack/react-table"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TableAgeRow = {
    clientSlug: string | null
    softwareSlug: string | null
    slug: string | null
    label: string | null
    level: string | null
    minMonth: number | null
    maxMonth: number | null
    pourcentage: number | null
    coefficient: string | null
    qualification: string | null
    indice: string | null
    echelon: string | null

}

export const columns: ColumnDef<TableAgeRow>[] = [

    {
        accessorKey: "label",
        header: "Libellé",

    },
    {
        accessorKey: "coefficient",
        header: "Coefficient",
    },
    {
        accessorKey: "qualification",
        header: "Qualification",
    },
    {
        accessorKey: "echelon",
        header: "Echelon",
    },
    {
        accessorKey: "indice",
        header: "Indice",
    },
    {
        accessorKey: "minMonth",
        header: "Début ancienneté",
    },
    {
        accessorKey: "maxMonth",
        header: "Fin ancienneté",
    },

    {
        accessorKey: "pourcentage",
        header: "Pourcentage",
    },

]

