"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
export type Validation = {
    clientSlug: string
    projectLabel: string | null | undefined
    description: string | null | undefined
    theme: string | null | undefined
    rowSlug: string | null | undefined
    countPending: number
    countApproved: number
    countRefused: number
}

export const columns: ColumnDef<Validation>[] = [
    {
        accessorKey: "projectLabel",
        header: "Projet",
    },
    {
        accessorKey: "theme",
        header: "Thême",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "countPending",
        header: "Nombre de réponse en attente",
    },
    {
        accessorKey: "countApproved",
        header: "Nombre de validation",
    },
    {
        accessorKey: "countRefused",
        header: "Nombre de refus",
    },
    {
        id: "pourcentage",
        header: "Pourcentage de validation",
        cell: ({ row }) => {
            const validation = row.original
            const pourcentageValidation = (validation.countApproved / (validation.countApproved + validation.countPending + validation.countRefused)) * 100
            return <Badge variant={pourcentageValidation < 100 ? "destructive" : "default"}>{pourcentageValidation}</Badge>
        }
    },
    {
        id: "open",
        header: "Detail",
        cell: ({ row }) => {
            const validation = row.original
            return (
                <Link href={`/client/${validation.clientSlug}/validation/${validation.rowSlug}`}>
                    <ArrowRight />
                </Link>
            )
        }
    }

]

