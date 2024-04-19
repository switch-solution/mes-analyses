"use client";
import { useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ProjectTableSeniorityRowSchema } from "@/src/helpers/definition"
import { ButtonLoading } from "@/components/ui/button-loader";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
type Seniority = {
    minMonth: number,
    maxMonth: number,
    percentage: number,
    id: string
}
import { createTableSeniorityRow } from "@/src/features/actions/project_data/project_tableSeniorityRow.actions"
export default function TableSeniority({ rows, clientSlug, projectSlug, processusSlug, tableSlug }: { rows: Seniority[], clientSlug: string, tableSlug: string, projectSlug: string, processusSlug: string, }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof ProjectTableSeniorityRowSchema>>({
        resolver: zodResolver(ProjectTableSeniorityRowSchema),
        defaultValues: {
            clientSlug: clientSlug,
            tableSenioritySlug: tableSlug,
            projectSlug: projectSlug,
            processusSlug: processusSlug,
            minMonth: 0,
            maxMonth: 0,
            percentage: 0
        },
    })

    const onSubmit = async (data: z.infer<typeof ProjectTableSeniorityRowSchema>) => {
        setLoading(true)
        const action = await createTableSeniorityRow(data)
        if ((action as { serverError?: string })?.serverError) {
            setLoading(false)
            const serverError = (action as { serverError?: string }).serverError;
            toast(`${serverError}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        }
    }
    return (
        <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
                <CardTitle>Table ancienneté</CardTitle>
                <CardDescription>
                    Table ancienneté code {tableSlug}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Liste des valeurs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ancienneté minimum en mois</TableHead>
                            <TableHead>Ancienneté maximum en mois</TableHead>
                            <TableHead className="text-right">Pourcentage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="font-medium">{row.minMonth}</TableCell>
                                <TableCell>{row.maxMonth}</TableCell>
                                <TableCell>{row.percentage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Form {...form}>
                    <form className='w-full space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="clientSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="projectSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="processusSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="minMonth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre minimum de mois</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nom du logiciel" type="number" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxMonth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre maximum de mois</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nom du logiciel" type="number" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="percentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pourcentage</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nom du logiciel" type="number" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

                    </form>

                </Form>
            </CardFooter>
        </Card>

    )
}

