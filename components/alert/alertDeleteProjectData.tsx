"use client"
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
import { deleteSociety } from "@/src/features/actions/project_data/project_society.actions"
export default function AlerteDeleteProjectData({ slug, processusSlug, clientSlug, projectSlug, }: { slug: string, processusSlug: string, clientSlug: string, projectSlug: string }) {

    return (
        <div className="mt-2 flex w-full justify-end">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="default">Supprimer les données</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irreversible. Voulez-vous vraiment supprimer ces données ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={async () => {
                            let action
                            switch (processusSlug) {
                                case "Standard_Processus_Society":
                                    action = await deleteSociety({
                                        slug,
                                        processusSlug,
                                        clientSlug,
                                        projectSlug

                                    })
                                    break;
                                default:
                                    throw new Error("Processus introuvable")
                            }
                            if ((action as { serverError?: string })?.serverError) {
                                const serverError = (action as { serverError?: string }).serverError;
                                toast(`${serverError}`, {
                                    description: new Date().toLocaleDateString(),
                                    action: {
                                        label: "fermer",
                                        onClick: () => console.log("fermeture"),
                                    },
                                })
                            }
                        }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )

}