"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
export type API = {
    clientSlug: string | null
    label: string | null
    slug: string | null
    count: string | null
    revoked: boolean | null

}
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
export const columns: ColumnDef<API>[] = [

    {
        accessorKey: "label",
        header: "Libellé",
    },

    {
        accessorKey: "count",
        header: "Activité",
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            return (
                <Badge variant={row.original.revoked ? "destructive" : "default"} >{row.original.revoked ? "Révoque" : "En production"}</Badge>
            )
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
                        <DropdownMenuItem><Link href={``}>Activité</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={``}>Révoquer</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },


    }
]

