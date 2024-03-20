"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Image = {
    clientSlug: string | null
    softwareSlug: string | null
    id: string | null,
    label: string | null
    type: string | null
    description: string | null
    slug: string | null
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
export const columns: ColumnDef<Image>[] = [

    {
        accessorKey: "id",
        header: "Code",
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/table/${row.original.slug}/edit`}>{row.original.id}</Link>
        }
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "type",
        header: "Type de table",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const setting = row.original
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
                        <DropdownMenuItem><Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/table/${row.original.slug}/`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/table/${row.original.slug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/table/${row.original.slug}/delete`}>Supprimer</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },


]

