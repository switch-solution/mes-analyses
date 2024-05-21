"use client"

import { ColumnDef } from "@tanstack/react-table"
import AlertUserPageValidation from "@/components/alert/alertUserPageValidation"
import Link from "next/link"
export type Workflow = {
    id: string
    userId: string
    label: string | null | undefined
    response: string | null | undefined,
    projectSlug: string
    clientSlug: string
    validationSlug: string,
    pageSlug: string
}
import { ArrowRight } from "lucide-react"
export const columns: ColumnDef<Workflow>[] = [
    {
        accessorKey: "label",
        header: "Libellé de la page",
    },
    {
        accessorKey: "response",
        header: "Réponse",
    },
    {
        id: 'valid',
        header: 'Valider',
        cell: ({ row }) => {
            return (
                <AlertUserPageValidation
                    clientSlug={row.original.clientSlug}
                    projectSlug={row.original.projectSlug}
                    projectPageSlug={row.original.pageSlug}
                    validationSlug={row.original.validationSlug}
                    alertProps={{
                        title: 'Validation de la page',
                        response: 'Valid',
                        dialog: 'Valider la page'
                    }}
                />
            )
        }
    },
    {
        id: 'refused',
        header: 'Refuser',
        cell: ({ row }) => {
            return (
                <AlertUserPageValidation
                    clientSlug={row.original.clientSlug}
                    projectPageSlug={row.original.pageSlug}
                    projectSlug={row.original.projectSlug}
                    validationSlug={row.original.validationSlug}
                    alertProps={{
                        title: 'Refuser de la page',
                        response: 'Refused',
                        dialog: 'Valider la page'
                    }}
                />
            )
        }
    },
    {
        id: 'open',
        header: 'Ouvrir',
        cell: ({ row }) => {
            return <Link href={`/client/${row.original.clientSlug}/project/${row.original.projectSlug}/page/${row.original.pageSlug}`}><ArrowRight /></Link>
        }
    }
]

