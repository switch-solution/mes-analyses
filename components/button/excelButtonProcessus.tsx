"use client";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Pickaxe } from "lucide-react";
import { extractionProcessus } from "@/src/features/actions/project_data/project_extraction.actions";
export default function ExcelButtonProcessusFile({ clientSlug, projectSlug, slug }: { clientSlug: string, projectSlug: string, slug: string }) {
    const router = useRouter()

    const handleClick = async () => {
        toast(`Extraction en cours`, {
            description: new Date().toLocaleDateString(),
            action: {
                label: "fermer",
                onClick: () => console.log("fermeture"),
            },
        })
        const action = await extractionProcessus({
            clientSlug,
            projectSlug,
            processusSlug: slug
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
            toast(`Extraction terminée`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
            if (action.data) {
                router.push(action.data)

            }

        }
    }
    return (
        <Button
            onClick={handleClick}
        >
            <Pickaxe />
        </Button>
    )

}