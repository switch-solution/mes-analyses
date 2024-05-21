"use client"
import { pageValidation } from "@/src/features/actions/page/page.actions"
import { Unlock } from "lucide-react"
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

export default function AlertPageValidation({ clientSlug, projectSlug, projectPageSlug }: { clientSlug: string, projectSlug: string, projectPageSlug: string }) {
    const handleClick = async () => {
        try {
            const action = await pageValidation({
                clientSlug: clientSlug,
                projectSlug: projectSlug,
                projectPageSlug: projectPageSlug
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
            toast(`Validation de la page`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })

        } catch (err) {
            console.log(err)
            throw new Error('Error')
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div aria-label="Validation de la page" className="hover:cursor-pointer"><Unlock /></div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Validation de la page</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action va valider la page et la rendre inaccessible le temps de la validation.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>Continuer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}