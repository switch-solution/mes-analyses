"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Component = {
    clientSlug: string | null
    label: string | null
    description: string | null
    status: string | null
    softwareLabel: string | null
    slug: string | null
    isForm: boolean | null
    isTextArea: boolean | null
    isImage: boolean | null
}

export const columns: ColumnDef<Component>[] = [

    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "label",
        header: "label",
    },

]

