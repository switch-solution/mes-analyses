"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StdComponent = {
    clientSlug: string | null
    softwareSlug: string | null
    label: string | null
    description: string | null
    softwareLabel: string | null
    slug: string | null
    status: string | null
    isForm: boolean | null
    isTextArea: boolean | null
    isImage: boolean | null
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

export const columns: ColumnDef<StdComponent>[] = [

    {
        accessorKey: "label",
        header: "Libellé",
        cell: ({ row }) => {
            if (row.original.isForm) {
                return <Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/component/${row.original.slug}/form`}>{row.getValue("label")}</Link>

            }
            if (row.original.isImage) {
                return <Link href={`/client/${row.original.clientSlug}/editor/${row.original.softwareSlug}/component/${row.original.slug}/image`}>{row.getValue("label")}</Link>

            }
            if (row.original.isTextArea) {
                return <Link href={`/client/${row.original.clientSlug}/editor/component/${row.original.softwareSlug}/${row.original.slug}/textarea`}>{row.getValue("label")}</Link>

            }
        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            if (row.original.isForm) {
                return <Badge>Formulaire</Badge>

            }
            if (row.original.isImage) {
                return <Badge>Image</Badge>

            }
            if (row.original.isTextArea) {
                return <Badge>Zone de texte</Badge>

            }

            throw new Error(`Type de composant inconnu`)
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Badge variant={row.getValue("status") === "actif" ? "default" : "secondary"}>{row.getValue("status")}</Badge>,
    },
    {
        accessorKey: "softwareLabel",
        header: "Logiciel",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const component = row.original

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
                        <DropdownMenuItem><Link href={`/client/${component.clientSlug}/editor/${row.original.softwareSlug}/component/${component.slug}/`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${component.clientSlug}/editot/${row.original.softwareSlug}/component/${component.slug}/delete`}>Supprimer</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

