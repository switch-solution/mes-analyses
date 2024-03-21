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
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/book/${row.original.bookSlug}/validation`}>{row.getValue("bookLabel")}</Link>
        }
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
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                            <span className="sr-only">Menu</span>
                            <MoreHorizontal className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Mes options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href={`/client/${user.clientSlug}/project/${user.projectSlug}`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${user.clientSlug}/project/${user.projectSlug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${user.clientSlug}/project/${user.projectSlug}/archived`}>Archiver</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

