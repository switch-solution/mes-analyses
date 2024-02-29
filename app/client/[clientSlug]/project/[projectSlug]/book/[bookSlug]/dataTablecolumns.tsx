"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Value = {
    projectSlug: string | null | undefined
    bookSlug: string | null | undefined
    isCode: string | null | undefined
    isLabel: string | null | undefined
    isDescription: string | null | undefined
    clientSlug: string | null
    recordId: string | null

}
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Value>[] = [
    {
        accessorKey: "isCode",
        header: "Code",
    },
    {
        accessorKey: "isLabel",
        header: "Label",
    },
    {
        accessorKey: "isDescription",
        header: "Description",

    },
    {
        id: "actions",
        cell: ({ row }) => {
            const input = row.original
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
                        <DropdownMenuItem><Link href={`/client/${input.clientSlug}/project/${input.projectSlug}/book/${input.bookSlug}/input/create`}>Ajouter</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${input.clientSlug}/project/${input.projectSlug}/book/${input.bookSlug}/input/${input.recordId}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${input.clientSlug}/project/${input.projectSlug}/book/${input.bookSlug}/input/${input.recordId}/delete`}>Supprimer</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

