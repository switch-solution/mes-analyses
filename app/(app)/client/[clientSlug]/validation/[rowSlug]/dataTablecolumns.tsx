"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
export type ValidationDetail = {
    clientSlug: string | null | undefined
    isApproved: boolean | null | undefined
    isRefused: boolean | null | undefined
    firstname: string | null | undefined
    lastname: string | null | undefined
}

export const columns: ColumnDef<ValidationDetail>[] = [
    {
        accessorKey: "lastname",
        header: "Nom",
    },
    {
        accessorKey: "firstname",
        header: "Prénom",
    },
    {
        accessorKey: "isApproved",
        header: "Approuvé",
        cell: ({ row }) => {
            const validation = row.original
            return (
                <Badge >{validation.isApproved ? "Oui" : "Non"}</Badge>
            )
        }
    },
    {
        accessorKey: "isRefused",
        header: "Refusé",
        cell: ({ row }) => {
            const validation = row.original
            return (
                <Badge variant={"destructive"}>{validation.isRefused ? "Oui" : "Non"}</Badge>
            )
        }
    },


]

