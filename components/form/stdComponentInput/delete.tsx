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
import { deleteStdInput } from "@/src/features/actions/stdInput/stdInput.actions";
import { Trash2 } from "lucide-react";

export default function DeleteStdInput({ clientSlug, componentSlug, id }: { clientSlug: string, componentSlug: string, id: string }) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash2 aria-label="supprimer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer le champ</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Êtes-vous sûr de vouloir supprimer ce champ ?
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => {
                        await deleteStdInput({ clientSlug, componentSlug, id })
                    }}>

                        Supprimer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


