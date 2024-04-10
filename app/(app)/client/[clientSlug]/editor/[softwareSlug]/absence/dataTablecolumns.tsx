"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SoftwareAbsence = {
    label: string | null
    description: string | null
    softwareLabel: string | null
    clientSlug: string | null
    slug: string | null
    isArchived: boolean | null
    softwareSlug: string | null
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

export const columns: ColumnDef<SoftwareAbsence>[] = [

    {
        accessorKey: "label",
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/absence/${row.original.slug}/edit`}>{row.original.label}</Link>
        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "status",
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
            const absence = row.original
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
                        <DropdownMenuItem><Link href={`/client/${absence.clientSlug}/editor/${row.original.softwareSlug}/absence/${absence.slug}/`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${absence.clientSlug}/editor/${row.original.softwareSlug}/absence/${absence.slug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${absence.clientSlug}/editot/${row.original.softwareSlug}/absence/${absence.slug}/delete`}>Supprimer</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

