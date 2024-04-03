"use client"
import { validProjectProcessus } from "@/src/features/actions/project_processus/project_processus.actions";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
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
export type Processus = {
    projectSlug: string
    clientSlug: string
    slug: string
    label: string | null
    description: string | null
    status: string | null

}
import { Badge } from "@/components/ui/badge";
export const columns: ColumnDef<Processus>[] = [
    {
        accessorKey: "label",
        header: "label",
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/processus/${row.original.slug}/`}>{row.original.label}</Link>
        }
    },
    {
        accessorKey: "description",
        header: "description",
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/processus/${row.original.slug}/description`}>Lire la description</Link>
        }
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            return <Badge>{row.original.status}</Badge>
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
                        {project.status !== "En attente de validation" ? <DropdownMenuItem onClick={async () => {
                            const action = await validProjectProcessus({
                                clientSlug: project.clientSlug,
                                projectSlug: project.projectSlug,
                                processusSlug: project.slug

                            })
                            if (action?.serverError) {
                                toast(`${action.serverError}`, {
                                    description: new Date().toLocaleDateString(),
                                    action: {
                                        label: "fermer",
                                        onClick: () => console.log("fermeture"),
                                    },
                                })
                            }
                        }}><Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/processus/`}>Valider</Link></DropdownMenuItem> : undefined}
                        <DropdownMenuItem><Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/processus/`}>WorkFlow de validation</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${project.clientSlug}/project/${project.slug}/`}>Pdf</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${project.clientSlug}/project/${project.slug}/archived`}>Excel</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    },

]

