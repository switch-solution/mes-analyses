"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Constant = {
    clientSlug: string | null
    code: string | null,
    value: string | null,
    dateStart: string | null,
    label: string | null
    description: string | null
    softwareLabel: string | null
    slug: string | null
    idccCode: string | null
    level: string | null
    softwareSlug: string | null
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

export const columns: ColumnDef<Constant>[] = [
    {
        accessorKey: "code",
        header: "code",
        cell: ({ row }) => {
            if (row.original.level === "Logiciel") {
                return <Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/constant/${row.original.slug}/edit`}><Badge>{row.original.code}</Badge></Link>
            }
            return <Badge variant="secondary">{row.original.code}</Badge>
        }
    },
    {
        accessorKey: "level",
        header: "Niveau",
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "softwareLabel",
        header: "Logiciel",
    },
    {
        accessorKey: "idccCode",
        header: "Code IDCC",
    },
    {
        accessorKey: "value",
        header: "Valeur",
    },
    {
        accessorKey: "dateStart",
        header: "Date de début",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const constant = row.original

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
                        {constant.level === "Logiciel" && <DropdownMenuItem><Link href={`/client/${constant.clientSlug}/editor/${row.original.softwareSlug}/constant/${constant.slug}/edit`}>Editer</Link></DropdownMenuItem>}
                        <DropdownMenuItem><Link href={`/client/${constant.clientSlug}/editor/${row.original.softwareSlug}/constant/${constant.slug}/duplicate`}>Dupliquer</Link></DropdownMenuItem>
                        {constant.level === "Logiciel" && <DropdownMenuItem><Link href={`/client/${constant.clientSlug}/editor/${row.original.softwareSlug}/constant/${constant.slug}/delete`}>Editer</Link></DropdownMenuItem>}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },


]

