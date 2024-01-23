"use client";
import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createBook } from "@/src/features/actions/book/book.actions";
import { BookFormSchema } from '@/src/helpers/definition';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
export default function CreateBook() {
    const form = useForm<z.infer<typeof BookFormSchema>>({
        resolver: zodResolver(BookFormSchema),
        defaultValues: {
            name: "",
            softwareId: "clrq5s0c00005m2efijivrtkr",
            status: "actif",
        }
    })

    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form action={createBook} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="softwareId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logiciel id</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mon cahier" required {...field} />
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
                                <FormControl>
                                    <Input type='hidden' placeholder="Mon cahier" required {...field} />
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
                                    <Input placeholder="Mon cahier" required {...field} />
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