"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClientSoftware = {
    lastname: string | null
    firstname: string | null
    isEditor: string | null

}
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<ClientSoftware>[] = [

    {
        accessorKey: "lastname",
        header: "Nom",
    },
    {
        accessorKey: "firstname",
        header: "Prénom",
    },
    {
        accessorKey: "isEditor",
        header: "Editeur",
        cell: ({ row }) => <Badge>{row.getValue("isEditor")}</Badge>,
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
                        <DropdownMenuItem><Link href={`/client/${software.firstname}/administrator/software/${software.firstname}/`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${software.firstname}/administrator/software/${software.firstname}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><DropdownMenuItem><Link href={`/client/${software.firstname}/administrator/software/${software.firstname}/edit`}>Editer</Link></DropdownMenuItem></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },


]

