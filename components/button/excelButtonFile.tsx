"use client";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react"
import { newExcelFile } from "@/src/features/actions/excel/excel.actions";
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

export default function ExcelButtonFile({ query }: { query: string }) {
    const router = useRouter()

    const handleClick = async () => {
        const action = await newExcelFile({ query })
        toast(`Traitement en cours`, {
            description: new Date().toLocaleDateString(),
            action: {
                label: "fermer",
                onClick: () => console.log("fermeture"),
            },
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

        if (action.data) {
            router.push(action.data)
        }
    }
    return (
        <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-sm"
            onClick={handleClick}
        >
            <File className="size-3.5" />
            <span className="sr-only sm:not-sr-only">Export Excel</span>
        </Button>
    )

}