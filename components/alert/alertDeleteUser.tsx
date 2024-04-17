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
import { deleteUser } from "@/src/features/actions/user/user.actions"
import { toast } from "sonner"

export default function AlertDeleteUser({ userId }: { userId: string }) {
    const handleClick = async () => {
        try {
            const action = await deleteUser({ id: userId })
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
        } catch (err) {
            console.log(err)
            throw new Error('Error')
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Désactivation du compte.</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer vous la désactivation du compte ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        La désactivation de votre compte entrainera votre déconnexion et vos données personnelles seront remplacées par des données anonymes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}