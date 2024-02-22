"use client";
import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { editBook } from "@/src/features/actions/book/book.actions";
import { BookFormSchemaEdit } from '@/src/helpers/definition';
import type { getStdBookBySlug } from "@/src/query/standard_book.query"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
export default function BookEditForm({ stdBook, clientSlug }: { stdBook: getStdBookBySlug, clientSlug: string }) {
    const form = useForm<z.infer<typeof BookFormSchemaEdit>>({
        resolver: zodResolver(BookFormSchemaEdit),
        defaultValues: {
            clientSlug: clientSlug,
            status: stdBook.status === "actif" ? "actif" : "archivé",
            description: stdBook.description,
            label: stdBook.label,
            bookSlug: stdBook.slug
        }
    })

    const onSubmit = async (data: z.infer<typeof BookFormSchemaEdit>) => {
        try {
            await editBook(data)
        } catch (err) {
            console.error(err)
            throw new Error('Une erreur est survenue lors de la création du cahier')
        }

    }

    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="clientSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bookSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logiciel</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Affecter le cahier à un logiciel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="actif">Actif</SelectItem>
                                        <SelectItem value="archivé">Archivé</SelectItem>

                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom du cahier</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mon cahier" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description du cahier</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mon cahier" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <Button type="submit">Envoyer</Button>

                </form>
            </Form>
        </div>
    )


}