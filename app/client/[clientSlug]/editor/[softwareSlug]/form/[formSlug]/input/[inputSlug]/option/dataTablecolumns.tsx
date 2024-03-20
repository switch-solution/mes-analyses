"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Option = {
    clientSlug: string | null
    componentSlug: string | null
    inputSlug: string | null
    defaultValue: boolean | null
    label: string | null
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

export const columns: ColumnDef<Option>[] = [

    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "defaultValue",
        header: "Valeur par default",
        cell: ({ row }) => {
            return row ? <Badge variant="default">Oui</Badge> : <Badge variant="secondary">Non</Badge>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const option = row.original

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
                        <DropdownMenuItem><Link href={`/client/${option.clientSlug}/editor/component/${option.componentSlug}/input/${option.inputSlug}/option/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${option.clientSlug}/editor/component/${option.componentSlug}/input/${option.inputSlug}/option/delete`}>Supprimer</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

