"use client";
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
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { approveProcessus } from "@/src/features/actions/project_data/project_approve.actions"
import { toast } from "sonner"

export default function AlertApproveProcessus({ processusSlug, clientSlug, projectSlug }: { processusSlug: string, clientSlug: string, projectSlug: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="default"><Check /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action va verouiller le processus en cours et ouvrir le suivant. L&apos;ensemble des valeurs seront envoyées à la validation.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => {
                        const action = await approveProcessus({
                            processusSlug,
                            clientSlug,
                            projectSlug
                        })
                        if (action?.serverError) {
                            toast(`${action.serverError}`, {
                                description: new Date().toLocaleDateString(),
                                action: {
                                    label: "fermer",
                                    onClick: () => console.log("fermeture"),
                                },
                            })
                        } else {
                            toast(`Le processus a été validé avec succès`, {
                                description: new Date().toLocaleDateString(),
                                action: {
                                    label: "fermer",
                                    onClick: () => console.log("fermeture"),
                                },
                            })
                        }

                    }}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )

}