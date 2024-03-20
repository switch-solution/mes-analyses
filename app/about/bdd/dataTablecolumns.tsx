"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
export type Seed = {
    name: string | null
    order: number | null,
    description: string | null
    status: string | null

}

export const columns: ColumnDef<Seed>[] = [
    {
        accessorKey: "name",
        header: "Libellé",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "order",
        header: "Ordre",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Badge variant={row.getValue("status") === "completed" ? "default" : "destructive"}>{row.getValue("status")}</Badge>,
    }



]

