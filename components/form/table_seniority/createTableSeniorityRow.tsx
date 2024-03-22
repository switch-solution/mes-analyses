"use client";
import * as z from "zod"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { TableSeniorityRowCreateSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
import { createTableSeniorityRow } from "@/src/features/actions/table_seniority/table_seniority.actions";
import { toast } from "sonner"

export default function CreateTableSeniorityRow({ clientSlug, softwareSlug, idcc, level, tableSenioritySlug }: { clientSlug: string, softwareSlug: string, idcc: string, level: 'logiciel' | 'client', tableSenioritySlug: string }) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof TableSeniorityRowCreateSchema>>({
        resolver: zodResolver(TableSeniorityRowCreateSchema),
        defaultValues: {
            clientSlug: clientSlug,
            softwareSlug: softwareSlug,
            tableSenioritySlug: tableSenioritySlug,
            level: level,
            idcc: idcc,
            label: "",
            id: "",
            coefficient: "",
            minMonth: 1,
            maxMonth: 1,
            qualification: "",
            indice: "",
            niveau: "",
            pourcentage: 1,

        },
    })
    const onSubmit = async (data: z.infer<typeof TableSeniorityRowCreateSchema>) => {
        try {
            setLoading(true)

            const action = await createTableSeniorityRow(data)
            if (action?.serverError) {
                setLoading(false)
                toast(`${action.serverError}`, {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                })
            }
        } catch (err) {
            setLoading(false)
            console.error(err)
        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name="clientSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...field} required />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tableSenioritySlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...field} required />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...field} required />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="idcc"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...field} required />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="softwareSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...field} required />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input placeholder="0001" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé</FormLabel>
                            <FormControl>
                                <Input placeholder="Ancienneté cadre - 1 an" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="coefficient"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Coefficient</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="indice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Indice</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="qualification"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Qualification</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="niveau"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Niveau</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
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
                            <FormLabel>Nombre  minimum de mois</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} required />
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
                            <FormLabel>Nombre  maximum de mois</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pourcentage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre d&apos;année de scolarité</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

            </form>

        </Form>

    )
}