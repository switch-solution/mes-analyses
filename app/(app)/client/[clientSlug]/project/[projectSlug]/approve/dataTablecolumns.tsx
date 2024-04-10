"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
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
export type Approve = {
    projectSlug: string | null
    clientSlug: string | null
    table: string | null
    rowSlug: string | null
    processusLabel: string | null
    slug: string | null
    valueId: string | null
    valueLabel: string | null

}
import { updateApprove } from "@/src/features/actions/approve/approve.actions"
export const columns: ColumnDef<Approve>[] = [

    {
        accessorKey: "processusLabel",
        header: "Processus",
    },
    {
        accessorKey: "valueId",
        header: "Code",
    },
    {
        accessorKey: "valueLabel",
        header: "Libellé",
    },
    {
        id: "accept",
        cell: ({ row }) => {
            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="default">Accepter</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Attention vous allez valider la ligne</AlertDialogTitle>
                            <AlertDialogDescription>
                                Vous êtes sur le point de valider la ligne. Voulez-vous continuer ?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={
                                async () => {
                                    const datas = {
                                        clientSlug: row.original.clientSlug!,
                                        projectSlug: row.original.projectSlug!,
                                        response: 'Accepté' as 'Accepté',
                                        approveSlug: row.original.slug!,
                                    }
                                    const action = await updateApprove(datas);
                                    if (action?.serverError) {
                                        toast(`${action.serverError}`, {
                                            description: new Date().toLocaleDateString(),
                                            action: {
                                                label: "fermer",
                                                onClick: () => console.log("fermeture"),
                                            },
                                        })
                                    }
                                    toast(`Mise à jour avec succès`, {
                                        description: new Date().toLocaleDateString(),
                                        action: {
                                            label: "fermer",
                                            onClick: () => console.log("fermeture"),
                                        },
                                    })
                                }
                            }>Continuer</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        },
    },
    {
        id: "reject",
        cell: ({ row }) => {
            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="default">Refuser</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Attention vous allez refuser la ligne</AlertDialogTitle>
                            <AlertDialogDescription>
                                Vous êtes sur le point de refuser la ligne. Voulez-vous continuer ?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={
                                async () => {
                                    const action = await updateApprove({
                                        clientSlug: row.original.clientSlug!,
                                        projectSlug: row.original.projectSlug!,
                                        approveSlug: row.original.slug!,
                                        response: 'Refusé' as 'Refusé',

                                    });
                                    if (action?.serverError) {
                                        toast(`${action.serverError}`, {
                                            description: new Date().toLocaleDateString(),
                                            action: {
                                                label: "fermer",
                                                onClick: () => console.log("fermeture"),
                                            },
                                        })
                                    }
                                    toast(`Mise à jour avec succès`, {
                                        description: new Date().toLocaleDateString(),
                                        action: {
                                            label: "fermer",
                                            onClick: () => console.log("fermeture"),
                                        },
                                    })
                                }
                            }>Continuer</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        },
    },

]

