"use client";
import { useState } from "react";
import { createValueInit } from "@/src/features/actions/form/form.actions";
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";

export default function ButtonAddFormValue({
    clientSlug,
    softwareSlug,
    formSlug,
    settingSlug,
    pageSlug,
    projectPageSlug,
    mode,
    projectSlug,
    buttonLabel = "Créer un élément"
}: {
    clientSlug: string,
    softwareSlug: string,
    formSlug: string,
    projectPageSlug: string | undefined,
    settingSlug?: string | undefined,
    pageSlug?: string | undefined,
    mode: 'Project' | 'Editeur'
    projectSlug: string | undefined,
    buttonLabel: string
}) {
    const [loading, setLoading] = useState(false);
    const handleClick = useDebouncedCallback(async () => {
        const action = await createValueInit({
            formSlug,
            softwareSlug,
            clientSlug,
            mode,
            projectSlug,
            settingSlug,
            pageSlug,
            projectPageSlug
        });
        if (action?.serverError) {
            setLoading(false)
            toast(`${action.serverError}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        } else {
            toast(`Création du formulaire`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        }

    }, 500)
    return (
        <Button onClick={handleClick} >{buttonLabel}</Button>
    )


}