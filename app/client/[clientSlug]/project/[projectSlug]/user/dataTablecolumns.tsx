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
export type UserProject = {
    clientSlug: string | null
    projectSlug: string | null
    image: string | null
    firstname: string | null
    lastname: string | null
    isAdmin: boolean | null
    isEditor: boolean | null
    isValidator: boolean | null
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<UserProject>[] = [
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
        accessorKey: "lastname",
        header: "Nom"
    },
    {
        accessorKey: "firstname",
        header: "Prénom",
    },
    {
        accessorKey: "isAdmin",
        header: "Administateur",
        cell: ({ row }) => {
            const isAdmin = row.getValue("isAdmin")
            return isAdmin ? <Badge variant="default">Oui</Badge> : <Badge variant="secondary">Non</Badge>
        }
    },
    {
        accessorKey: "isEditor",
        header: "Editeur",
        cell: ({ row }) => {
            const isEditor = row.getValue("isEditor")
            return isEditor ? <Badge variant="default">Oui</Badge> : <Badge variant="secondary">Non</Badge>
        }
    },
    {
        accessorKey: "isValidator",
        header: "Valideur",
        cell: ({ row }) => {
            const isValidator = row.getValue("isValidator")
            return isValidator ? <Badge variant="default">Oui</Badge> : <Badge variant="secondary">Non</Badge>
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
                        <DropdownMenuItem><Link href={`/client/${user.clientSlug}/project/${user.projectSlug}`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${user.clientSlug}/project/${user.projectSlug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${user.clientSlug}/project/${user.projectSlug}/archived`}>Archiver</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

