"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
    clientSlug: string | null
    softwareSlug: string | null
    label: string | null
    description: string | null
    isObligatory: boolean | null
    slug: string | null
    accept: string | null
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

export const columns: ColumnDef<Task>[] = [

    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "isObligatory",
        header: "Obligatoire",
        cell: ({ row }) => <Badge>{row.getValue("isObligatory") ? "oui" : "non"}</Badge>,
    },
    {
        accessorKey: "accept",
        header: "Format du fichier",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const attachment = row.original

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
                        <DropdownMenuItem><Link href={`/client/${attachment.clientSlug}/editor/attachment`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${attachment.clientSlug}/editor/attachment/${attachment.slug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${attachment.clientSlug}/editor/attachment/${attachment.slug}/delete`}>Supprimer</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },


]

