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
export type Invoice = {
    socialReason: string | null
    dateStart: string | null
    dateEnd: string | null
    status: string | null
    amount: string | null
    slug: string | null

}

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "socialReason",
        header: "Raison sociale"
    },
    {
        accessorKey: "dateStart",
        header: "Date de début",
    },
    {
        accessorKey: "dateEnd",
        header: "Date de fin",
    },
    {
        accessorKey: "status",
        header: "Statut",
    },
    {
        accessorKey: "amount",
        header: "Montant",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const invoice = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Mes options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href={`/administratir/invoice/${invoice.slug}}`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/administratir/invoice/${invoice.slug}/edit}`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/administratir/invoice/${invoice.slug}}`}>Archiver</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

