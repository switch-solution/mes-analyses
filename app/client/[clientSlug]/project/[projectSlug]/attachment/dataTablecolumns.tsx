"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

export type Attachment = {
    slug: string | null
    label: string | null
    description: string | null
    clientSlug: string | null
    projectSlug: string | null
    isObligatory: boolean | null
    isDelivered: boolean | null
    deliveryDeadline: string | null
}

export const columns: ColumnDef<Attachment>[] = [
    {
        accessorKey: "label",
        header: "label",
    },
    {
        accessorKey: "description",
        header: "description",
    },
    {
        accessorKey: "deliveryDeadline",
        header: "Date limite pour livraison",

    },
    {
        accessorKey: "isDelivered",
        header: "Avancement",
        cell: ({ row }) => { return row.getValue("isDelivered") ? <Badge>Livré</Badge> : <Badge variant="destructive">En attente</Badge> },
    },
    {
        accessorKey: "isObligatory",
        header: "Status",
        cell: ({ row }) => { return row.getValue("isObligatory") ? <Badge>Obligatoire</Badge> : <Badge variant="secondary">Facultatif</Badge> },
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
                        <DropdownMenuItem><Link href={`/client/${attachment.clientSlug}/project/${attachment.projectSlug}/${attachment.slug}/upload`}>Ajouter</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${attachment.clientSlug}/project/${attachment.projectSlug}/${attachment.slug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${attachment.clientSlug}/project/${attachment.projectSlug}/${attachment.slug}/delete`}>Supprimer</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

