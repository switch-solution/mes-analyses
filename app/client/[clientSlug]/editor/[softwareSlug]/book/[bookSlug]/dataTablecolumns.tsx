"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StdChapter = {
    clientSlug: string | null
    slug: string
    bookLabel: string | null
    bookSlug: string | null
    label: string | null
    level: string | null

}
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<StdChapter>[] = [
    {
        accessorKey: "bookLabel",
        header: "Livre",
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/editor/book/${row.original.bookSlug}/edit/`}>{row.original.bookLabel}</Link>
        }
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "level",
        header: "Niveau",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const chapter = row.original
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
                        <DropdownMenuItem><Link href={`/client/${chapter.clientSlug}/editor/book/${chapter.bookSlug}/`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${chapter.clientSlug}/editor/book/${chapter.bookSlug}/chapter/${chapter.slug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${chapter.clientSlug}/editor/book/${chapter.bookSlug}/chapter/${chapter.slug}/associate`}>Associer des chapitres</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${chapter.clientSlug}/editot/book/${chapter.bookSlug}/${chapter.slug}/delete`}>Supprimer</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

