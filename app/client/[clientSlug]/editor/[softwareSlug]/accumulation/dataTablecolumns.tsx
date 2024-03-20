"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SoftwareAccumulation = {
    clientSlug: string | null
    softwareSlug: string | null
    slug: string | null
    id: string | null
    label: string | null
    description: string | null
    isArchived: boolean | null
}
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ro } from "date-fns/locale"

export const columns: ColumnDef<SoftwareAccumulation>[] = [


    {
        accessorKey: "id",
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/accumulation/${row.original.slug}`}>{row.original.id}</Link>

        }
    },
    {
        accessorKey: "label",
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/accumulation/${row.original.slug}`}>{row.original.label}</Link>

        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "isArchived",
        header: "Status",
        cell: ({ row }) => <Badge variant={row.original.isArchived ? "secondary" : "default"}>{row.original.isArchived ? "Archivé" : "Actif"}</Badge>,

    },
    {
        accessorKey: "softwareLabel",
        header: "Logiciel",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const book = row.original

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
                        <DropdownMenuItem><Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/accumulation/${row.original.slug}`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/accumulation/${row.original.slug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/accumulation/${row.original.slug}/delete`}>Supprimer</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

