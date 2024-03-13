"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Badge } from "@/components/ui/badge"
export type WorkFlow = {
    projectSlug: string | null
    bookSlug: string | null
    bookLabel: string | null
    response: string | null
    clientSlug: string | null
    firstname: string | null
    lastname: string | null

}
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<WorkFlow>[] = [
    {
        accessorKey: "bookLabel",
        header: "Cahier",
    },
    {
        accessorKey: "lastname",
        header: "Nom",
    },
    {
        accessorKey: "firstname",
        header: "Prénom",

    },
    {
        accessorKey: "response",
        header: "Réponse",
        cell: ({ row }) => {
            return (row.original.response === "En attente" ? <Badge variant="secondary">En attente</Badge> : row.original.response === "Validé" ? <Badge variant="default">Validé</Badge> : <Badge variant="destructive">Refusé</Badge>)
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const validation = row.original
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
                        <DropdownMenuItem><Link href={`/client/${validation.clientSlug}/project/${validation.projectSlug}/book/${validation.bookSlug}/validation/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${validation.clientSlug}/project/${validation.projectSlug}/book/${validation.bookSlug}/validation/`}>Supprimer</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

