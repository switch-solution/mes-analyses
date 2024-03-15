"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export type ClientUser = {
    image: string | null
    name: string | null
    isBilling: string | null
    isActivated: boolean
    email: string | null
    isBlocked: boolean

}
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"


export const columns: ColumnDef<ClientUser>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "image",
        header: "Avatar",
        cell: ({ row }) =>
            <Avatar>
                <AvatarImage src={row.getValue("image")} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ,

    },
    {
        accessorKey: "name",
        header: "Nom",

    },
    {
        accessorKey: "isBilling",
        header: "Facturable",

    },
    {
        accessorKey: "isBlocked",
        header: "Bloqué",
        cell: ({ row }) => {
            return (row.original.isBlocked ? <Badge variant="destructive">Bloqué</Badge> : <Badge>Actif</Badge>)
        }

    },
    {
        accessorKey: "isActivated",
        header: "Actif",
        cell: ({ row }) => {
            return (row.original.isActivated ? <Badge>Actif</Badge> : <Badge variant="secondary">Invitation en attente</Badge>)
        }
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
                        <DropdownMenuItem><Link href={`/client/${user.email}/administrator/software/${user.email}/`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${user.email}/administrator/software/${user.email}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${user.email}/administrator/software/${user.email}/delete`}>Supprimer</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

