"use client";
import React from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ChapterStandardComposantSchema } from "@/src/helpers/definition"
import { createAssociationChapterStandardComposant } from "@/src/features/actions/chapterStdComponent/chapterStdComponent.actions"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
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
type standardComponents = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    clientId: string;
    status: string;
    softwareId: string;
}
export default function FormAssociateChapterAndStdComponent({ chapterId, standardComponents }: { chapterId: string, standardComponents: standardComponents[] }) {
    const form = useForm<z.infer<typeof ChapterStandardComposantSchema>>({
        resolver: zodResolver(ChapterStandardComposantSchema),
        defaultValues: {
            chapterId: chapterId,

        },
    })

    const onSubmit = async (data: z.infer<typeof ChapterStandardComposantSchema>) => {
        try {
            await createAssociationChapterStandardComposant(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="chapterId"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="standardComposantId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Composant</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Liste des composants disponibles" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {standardComponents.map((standardComponent) => (
                                        <SelectItem key={standardComponent.id} value={standardComponent.id}>{standardComponent.title}</SelectItem>


                                    ))}

                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Associer un composant à ce chapitre

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Ajouter</Button>
            </form>
        </Form>
    )
}