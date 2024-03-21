"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClientSoftware = {
    label: string | null
    clientSlug: string | null
    softwareSlug: string | null
}
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<ClientSoftware>[] = [

    {
        accessorKey: "id",
        header: "id",
        cell: ({ row }) => {
            return (<Link href={`/client/${row.original.clientSlug}/administrator/software/${row.original.softwareSlug}/user`} >{row.original.label}</Link>)
        }
    },
    {
        accessorKey: "label",
        header: "Nom du logiciel",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const software = row.original

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
                        <DropdownMenuItem><Link href={`/client/${software.clientSlug}/administrator/software/${software.softwareSlug}/`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${software.clientSlug}/administrator/software/${software.softwareSlug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${software.clientSlug}/administrator/software/${software.softwareSlug}/delete`}>Supprimer</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

