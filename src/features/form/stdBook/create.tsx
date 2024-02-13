"use client";
import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createBook } from "@/src/features/actions/book/book.actions";
import { BookFormSchema } from '@/src/helpers/definition';
import type { Software } from "@/src/helpers/type";
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
export default function BookCreateForm({ softwares }: { softwares: Software[] }) {
    const form = useForm<z.infer<typeof BookFormSchema>>({
        resolver: zodResolver(BookFormSchema),
        defaultValues: {
            name: "",
            softwareId: softwares?.at(0)?.id,
            status: "actif",
            description: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof BookFormSchema>) => {
        try {
            BookFormSchema.parse(data)
            await createBook(data)
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
                        name="softwareId"
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
                                        {softwares.map((software) => (
                                            <SelectItem key={software.id} value={software.id}>{software.name}</SelectItem>))}

                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' placeholder="Mon cahier" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
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