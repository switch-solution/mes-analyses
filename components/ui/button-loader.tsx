import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonLoading() {
    return (
        <Button disabled>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Chargement
        </Button>
    )
}