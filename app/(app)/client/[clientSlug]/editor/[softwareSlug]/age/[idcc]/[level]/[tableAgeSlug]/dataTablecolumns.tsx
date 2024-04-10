"use client"

import { ColumnDef } from "@tanstack/react-table"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TableAgeRow = {
    clientSlug: string | null
    softwareSlug: string | null
    slug: string | null
    id: string | null
    label: string | null
    level: string | null
    age: number | null
    minMonth: number | null
    maxMonth: number | null
    schoolYear: number | null
    pourcentage: number | null
}

export const columns: ColumnDef<TableAgeRow>[] = [

    {
        accessorKey: "age",
        header: "Age",

    },
    {
        accessorKey: "schoolYear",
        header: "Nombre d'année d'etude",
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

