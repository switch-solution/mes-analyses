"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StdBook = {
    label: string | null
    description: string | null
    softwareLabel: string | null
    clientSlug: string | null
    slug: string | null
    projectSlug: string | null
    isHold: boolean | null
    isStarted: boolean | null
    isValidate: boolean | null
    isModifiedAfertValidation: boolean | null
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

export const columns: ColumnDef<StdBook>[] = [
    {
        accessorKey: "label",
        cell: ({ row }) => {
            const book = row.original
            return (
                <Link href={`/client/${book.clientSlug}/project/${book.projectSlug}/book/${book.slug}/`}>
                    {book.label}
                </Link>
            )
        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "isHold",
        header: "En attente",

    },
    {
        accessorKey: "isStarted",
        header: "Commencé",

    },
    {
        accessorKey: "isValidate",
        header: "Validé",

    },
    {
        accessorKey: "isModifiedAfertValidation",
        header: "Modifié après validation",

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
                        <DropdownMenuItem><Link href={`/client/${book.clientSlug}/project/${book.projectSlug}/book/${book.slug}/`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${book.clientSlug}/project/${book.projectSlug}/book/${book.slug}/`}>Supprimer</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

