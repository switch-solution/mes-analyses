"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
export type Task = {
    projectSlug: string | null
    label: string | null
    description: string | null
    status: string | null,
    clientSlug: string | null
    deadline: string | null
    isUpload: boolean | null
    slug: string | null

}

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "label",
        header: "label",

    },
    {
        accessorKey: "description",
        header: "description",
    },
    {
        accessorKey: "isUpload",
        header: "Charger des fichiers",
        cell: ({ row }) => {
            const task = row.original
            return task.isUpload ? <Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/task/${row.original.slug}/upload`}><Upload className="size-6" /></Link> : null
        },
    },
    {
        accessorKey: "status",
        header: "status",
    },
    {
        accessorKey: "deadline",
        header: "Date limite",
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const task = row.original
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
                        <DropdownMenuItem><Link href={`/client/${task.clientSlug}/project/${task.projectSlug}`}>Ouvrir</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${task.clientSlug}/project/${task.projectSlug}/uplo`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${task.clientSlug}/project/${task.projectSlug}/archived`}>Archiver</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

