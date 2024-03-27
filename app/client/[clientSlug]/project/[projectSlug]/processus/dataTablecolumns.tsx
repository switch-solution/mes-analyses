"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
export type Processus = {
    projectSlug: string | null
    clientSlug: string | null
    isStarted: boolean | null
    isFinished: boolean | null
    formUrl: string | null
    descriptionUrl: string | null
    slug: string | null
    label: string | null
    description: string | null

}

export const columns: ColumnDef<Processus>[] = [
    {
        accessorKey: "label",
        header: "label",
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/processus/${row.original.slug}/data`}>{row.original.label}</Link>
        }
    },
    {
        accessorKey: "description",
        header: "description",
    },
    {
        accessorKey: "isStarted",
        header: "Commencé",
        cell: ({ row }) => {
            return row.original.isStarted ? <Badge>Oui</Badge> : <Badge variant="secondary">Non</Badge>
        }
    },
    {
        accessorKey: "isFinished",
        header: "Finalisé",
        cell: ({ row }) => {
            return row.original.isFinished ? <Badge>Oui</Badge> : <Badge variant="secondary">Non</Badge>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const project = row.original

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
                        <DropdownMenuItem><Link href={`/client/${project.clientSlug}/project/${project.slug}`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${project.clientSlug}/project/${project.slug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${project.clientSlug}/project/${project.slug}/archived`}>Archiver</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

