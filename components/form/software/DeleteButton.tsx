"use client";
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { deleteSoftware } from "../../../src/features/actions/software/software.actions";

export const DeleteButtonSofware = async ({ id }: { id: string }) => {

    const deleteInvoiceWithId = deleteSoftware.bind(null, id);
    return (
        <form action={deleteInvoiceWithId} className="flex flex-col justify-end items-center">
            <Button variant="destructive">
                <form action={deleteInvoiceWithId}></form>
                <span className="sr-only">Supprimer</span>
                <TrashIcon className="w-4" />
            </Button>
        </form>
    )
}

