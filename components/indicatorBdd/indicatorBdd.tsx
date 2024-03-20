"use client";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import type { getCountAllTables } from "@/src/query/bdd.query";
export default function IndicatorBdd({ count }: { count: getCountAllTables }) {
    return (
        <DataTable columns={columns} data={count} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" />
    )
}