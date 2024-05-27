"use client"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
export type Constant = {
    id: string | null
    label: string | null,
    dateStart: string | null,
    dateEnd: string | null | undefined,
    value: string | null,
    slug: string | null,
    clientSlug: string | null
    idcc: string | null
    extended: boolean
}

export const columns: ColumnDef<Constant>[] = [
    {
        accessorKey: "id",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "dateStart",
        header: "Date de début",
    },
    {
        accessorKey: "dateEnd",
        header: "Date de fin",
    },
    {
        accessorKey: "value",
        header: "Valeur",
    },
    {
        accessorKey: "extended",
        header: "Etendu",
        cell: ({ row }) => {
            const extended = row.original.extended
            return (
                <Badge>{extended ? "Oui" : "Non"}</Badge>
            )
        }
    },

]

