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
    FormDescription
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ChapterFormSchema } from "@/src/helpers/definition";
import type { getChapterBook } from "@/src/query/standard_book.query";
export default function CreateChapterForm({ bookId, chapters }: { bookId: string, chapters: getChapterBook[] }) {
    const form = useForm<z.infer<typeof ChapterFormSchema>>({
        resolver: zodResolver(ChapterFormSchema),
        defaultValues: {
            bookId: bookId,
            label: "",
            level: "1",
            parentId: "",
            rank: "0",
            underRank: "0"
        },
    })

    const onSubmit = async (data: z.infer<typeof ChapterFormSchema>) => {
        try {
            ChapterFormSchema.parse(data)
            await createChapter(data)
        } catch (err) {
            throw new Error('Oups! Something went wrong!')
            console.error(err)
        }
    }
    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                    <Input type="text" placeholder="Brut" required {...field} />
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
                                    <Input type="number" min={1} required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="rank"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rang</FormLabel>
                                <FormControl>
                                    <Input type="number" min={0} required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="underRank"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rang</FormLabel>
                                <FormControl>
                                    <Input type="number" min={0} required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="parentId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chapitre parents</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Associer au chaptitre parent" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {chapters.map((chapter) => (
                                            <SelectItem key={chapter.id} value={chapter.id}>{`${chapter.level}.${chapter.rank}.${chapter.underRank} ${chapter.label}`}</SelectItem>))}

                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Associer au chaptitre parent
                                </FormDescription>
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