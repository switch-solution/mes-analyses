"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Idcc = {
    id: string | null
    clientSlug: string | null
    softwareSlug: string | null
    slug: string | null
    label: string | null
    level: string | null
}

export const columns: ColumnDef<Idcc>[] = [
    {
        accessorKey: "level",
        header: "Niveau",
    },
    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },


]

