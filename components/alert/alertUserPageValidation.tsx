"use client"
import { validationUserPage } from "@/src/features/actions/page/page.actions"
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
import { Check, Ban } from "lucide-react"
export default function AlertUserPageValidation({ clientSlug,
    projectSlug,
    validationSlug,
    projectPageSlug,
    alertProps }: {
        clientSlug: string,
        validationSlug: string,
        projectSlug: string,
        projectPageSlug: string
        alertProps: {
            title: string,
            response: 'Valid' | 'Refused',
            dialog: string
        }


    }) {
    const handleClick = async () => {
        try {
            const action = await validationUserPage({
                clientSlug: clientSlug,
                projectSlug: projectSlug,
                pageSlug: projectPageSlug,
                validationSlug: validationSlug,
                response: alertProps.response
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
                <div aria-label={alertProps.dialog} className="hover:cursor-pointer">{alertProps.response === 'Valid' ? <Check /> : <Ban />}</div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{alertProps.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {alertProps.dialog}
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