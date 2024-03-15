"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"

export type Event = {
    project: string | null,
    level: string | null,
    message: string | null,
    date: string | null

}

export const columns: ColumnDef<Event>[] = [

    {
        accessorKey: "project",
        header: "Projet",
    },
    {
        accessorKey: "level",
        header: "Type",
        cell: ({ row }) => {
            return (
                row.original.level === "warning" ? <Badge variant="destructive">Attention</Badge> :
                    row.original.level === "info" ? <Badge variant="default">Information</Badge> : null
            )
        }
    },
    {
        accessorKey: "message",
        header: "Message",
    },
    {
        accessorKey: "date",
        header: "Date",
    },

]

