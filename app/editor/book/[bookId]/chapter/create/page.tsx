"use client";

import React from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createChapter } from "@/src/features/actions/editor/editor.actions"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChapterFormSchema } from "@/src/helpers/definition";

export default function CreateChapter({ params }: { params: { bookId: string } }) {
    const form = useForm<z.infer<typeof ChapterFormSchema>>({
        resolver: zodResolver(ChapterFormSchema),
        defaultValues: {
            bookId: params.bookId,
            label: "",
            level: "",
        },
    })

    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form action={createChapter} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="bookId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' required {...field} />
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
                                <FormLabel>Nom du chapitre</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Brut" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Niveau</FormLabel>
                                <FormControl>
                                    <Input placeholder="1" required {...field} />
                                </FormControl>
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