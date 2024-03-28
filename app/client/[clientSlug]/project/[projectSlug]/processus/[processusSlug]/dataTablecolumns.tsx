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
import { updateFinishRow } from "@/src/features/actions/approve/approve.actions"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
export type ProjectData = {
    projectSlug: string | null
    processusSlug: string | null
    clientSlug: string | null
    id: string | null
    label: string | null
    slug: string | null
    status: string | null

}
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

export const columns: ColumnDef<ProjectData>[] = [
    {
        accessorKey: "id",
        header: "Code",
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/processus/${row.original.processusSlug}/data/${row.original.slug}/edit`}>{row.original.id}</Link>
        }
    },
    {
        accessorKey: "label",
        header: "Libellé",
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            return <Badge>{row.original.status}</Badge>
        }
    },

    {
        id: "isFinished",
        cell: ({ row }) => {
            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="default">Envoyer à la validation</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>L&apos;enregistrement va partir à la validation</AlertDialogTitle>
                            <AlertDialogDescription>
                                Attention vous allez envoyer cette enregistrement à la validation. La ligne ne sera plus modifiable dans l&apos;attente du retour
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={
                                async () => {
                                    const data = {
                                        clientSlug: row.original.clientSlug!,
                                        projectSlug: row.original.projectSlug!,
                                        slug: row.original.slug!,
                                        processusSlug: row.original.processusSlug!,
                                        table: "Project_Society" as "Project_Society",
                                        valueId: row.original.slug!,
                                        valueLabel: row.original.label!,
                                    }
                                    const action = await updateFinishRow(data)
                                    if (action?.serverError) {
                                        toast(`${action.serverError}`, {
                                            description: new Date().toLocaleDateString(),
                                            action: {
                                                label: "fermer",
                                                onClick: () => console.log("fermeture"),
                                            },
                                        })
                                    } else {
                                        toast(`Mise à jour avec succès`, {
                                            description: new Date().toLocaleDateString(),
                                            action: {
                                                label: "fermer",
                                                onClick: () => console.log("fermeture"),
                                            },
                                        })
                                    }

                                }
                            }>Continuer</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        },
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
                        <DropdownMenuItem><Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/processus/${row.original.processusSlug}/data/${row.original.slug}/edit`}>Editer</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${project.clientSlug}/project/${project.slug}/archived`}>Validé</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${project.clientSlug}/project/${project.slug}/archived`}>Pdf</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/client/${project.clientSlug}/project/${project.slug}/archived`}>Excel</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

