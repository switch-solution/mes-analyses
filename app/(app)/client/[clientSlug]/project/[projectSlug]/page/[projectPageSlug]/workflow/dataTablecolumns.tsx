"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Workflow = {
    pageLabel: string | null | undefined
    firstname: string | null | undefined
    lastname: string | null | undefined
    response: string | null | undefined,

}

export const columns: ColumnDef<Workflow>[] = [
    {
        accessorKey: "pageLabel",
        header: "Libellé de la page",
    },
    {
        accessorKey: "lastname",
        header: "Nom",
    },
    {
        accessorKey: "firstname",
        header: "Prénom",
    },
    {
        accessorKey: "response",
        header: "Réponse",
    },


]

