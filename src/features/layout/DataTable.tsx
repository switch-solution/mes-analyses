"use client"
import React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    useReactTable,
    SortingState,
    VisibilityState
} from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    href: string | undefined,
    hrefToCreate: string,
    searchPlaceholder: string,
    inputSearch: string
    isEditable?: boolean
}
import { Pencil, Eye, Trash2Icon } from "lucide-react"
export function DataTable<TData, TValue>({
    columns,
    data,
    href,
    hrefToCreate,
    searchPlaceholder,
    inputSearch,
    isEditable = true,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({ id: false })
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (<div>
        <div className="flex items-center py-4">
            <Input
                placeholder={searchPlaceholder}
                value={(table.getColumn(inputSearch)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(inputSearch)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Colonnes
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter(
                            (column) => column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
            {isEditable ?
                <div className="ml-4">
                    <Button type="submit" variant="default"><Link href={hrefToCreate}>Ajouter une nouvelle valeur</Link> </Button>

                </div> : null}
        </div>

        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    let id = (cell.getContext().row.original as any).id;
                                    return (
                                        cell.getContext().column.id === 'open' && isEditable ? <TableCell key={cell.id} ><Link href={`${href}/${id}`}> <Eye /></Link></TableCell> :
                                            cell.getContext().column.id === 'edit' && isEditable ? <TableCell key={cell.id}><Link href={`${href}/${id}/edit`}> <Pencil /></Link></TableCell> :
                                                cell.getContext().column.id === 'delete' && isEditable ? <TableCell key={cell.id}><Link href={`${href}/${id}/delete`}> <Trash2Icon /></Link></TableCell>
                                                    : < TableCell key={cell.id} >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>

                                    )
                                })}
                            </TableRow>

                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>

                    )}

                </TableBody>
            </Table>
        </div>
    </div >
    )
}