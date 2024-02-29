"use client";
import React from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ImportBookProjectSchema } from '@/src/helpers/definition';
import { importBookProject } from "@/src/features/actions/project_Book/project_book.actions"
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
    FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { getBookBySoftwareLabelAndClientSlug } from "@/src/query/software.query"
export default function ImportBook({ books, clientSlug, projectSlug }: { books: getBookBySoftwareLabelAndClientSlug, clientSlug: string, projectSlug: string }) {

    const form = useForm<z.infer<typeof ImportBookProjectSchema>>({
        resolver: zodResolver(ImportBookProjectSchema),
        defaultValues: {
            clientSlug: clientSlug,
            projectSlug: projectSlug,
            bookSlug: books.at(0)?.slug,
            label: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof ImportBookProjectSchema>) => {
        try {
            await importBookProject(data)
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
                        name="projectSlug"
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
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Libellé de votre cahier</FormLabel>
                                <FormControl>
                                    <Input placeholder="Cahier brut" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Le libellé de votre cahier doit être unique sur votre projet.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bookSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Livre à importer</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner un livre" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {books.map(book =>
                                            <SelectItem key={book.slug} value={book.slug}>{book.label}</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>

    )
}