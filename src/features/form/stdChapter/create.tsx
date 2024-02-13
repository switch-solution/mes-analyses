"use client";

import React from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createChapter } from "@/src/features/actions/stdChapter/stdChapter.actions"
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
import { ChapterFormSchema } from "@/src/helpers/definition";
export default function CreateChapter({ bookId }: { bookId: string }) {
    const form = useForm<z.infer<typeof ChapterFormSchema>>({
        resolver: zodResolver(ChapterFormSchema),
        defaultValues: {
            label: "",
            level_1: 1,
            level_2: 0,
            level_3: 0,
        },
    })
    const createChapterWithBookId = createChapter.bind(null, bookId)
    const onSubmit = async (data: z.infer<typeof ChapterFormSchema>) => {
        try {
            await createChapterWithBookId(data)
        } catch (err) {
            console.error(err)

            throw new Error('Oups! Something went wrong!')
        }
    }
    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom du chapitre</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Brut" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="level_1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Titre</FormLabel>
                                <FormControl>
                                    <Input type="number" min={1} max={99} required {...field} />
                                </FormControl>
                                <FormDescription>Correspond à X.0.0 </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="level_2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sous chapitre</FormLabel>
                                <FormControl>
                                    <Input type="number" min={0} max={99} required {...field} />
                                </FormControl>
                                <FormDescription>Correspond à 1.X.0 </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="level_3"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Détail</FormLabel>
                                <FormControl>
                                    <Input type="number" min={0} max={99} required {...field} />
                                </FormControl>
                                <FormDescription>Correspond à 1.1.X </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}

                    />


                    <Button type="submit">Envoyer</Button>

                </form>

            </Form>

        </div >
    )

}