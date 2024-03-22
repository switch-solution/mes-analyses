"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
export type WorkFlow = {
    clientSlug: string | null
    projectSlug: string | null
    bookSlug: string | null
    user: string | null
    bookLabel: string | null
    isValid: boolean | null
    comment: string | null
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<WorkFlow>[] = [
    {
        accessorKey: "bookLabel",
        header: "Cahier",
    },
    {
        accessorKey: "user",
        header: "Validateur",
    },
    {
        accessorKey: "isValid",
        header: "Status",
        cell: ({ row }) => {
            return row.getValue("isValid") ? <Badge>Validé</Badge> : <Badge variant="secondary">En attente</Badge>
        }
    },
    {
        accessorKey: "comment",
        header: "Commentaire",
    },
]

