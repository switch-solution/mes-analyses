"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Setting = {
    clientSlug: string | null
    code: string | null,
    label: string | null
    value: string | null
    dateStart: string | null
    dateEnd: string | null
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
        header: "code",
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
                        <DropdownMenuItem><Link href={`/client/${setting.clientSlug}/editor/setting`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${setting.clientSlug}/editor/setting/${setting.slug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${setting.clientSlug}/editor/setting/${setting.slug}/delete`}>Supprimer</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },


]

