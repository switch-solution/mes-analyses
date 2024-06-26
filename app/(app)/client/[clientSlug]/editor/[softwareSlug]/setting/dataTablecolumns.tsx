"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Setting = {
    clientSlug: string | null
    softwareSlug: string | null
    code: string | null,
    label: string | null
    value: string | null
    softwareLabel: string | null
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
export const columns: ColumnDef<Setting>[] = [
    {
        accessorKey: "code",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Code
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/editor/setting/${row.original.slug}/edit`}>{row.original.code}</Link>
        }
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "value",
        header: "Valeur",
    },
    {
        accessorKey: "softwareLabel",
        header: "Logiciel",
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
                        <DropdownMenuItem><Link href={`/client/${setting.clientSlug}/editor/${setting.softwareSlug}/setting`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${setting.clientSlug}/editor/${setting.softwareSlug}/setting/${setting.slug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${setting.clientSlug}/editor/${setting.softwareSlug}/setting/${setting.slug}/delete`}>Supprimer</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },


]

