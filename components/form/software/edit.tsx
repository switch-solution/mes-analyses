"use client";

import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SoftwaresSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { editSoftware } from '../../../src/features/actions/software/software.actions'
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
export default function SoftwareEdit({ softwareSlug, software }: { softwareSlug: string, software: z.infer<typeof SoftwaresSchema> }) {



    const form = useForm<z.infer<typeof SoftwaresSchema>>({
        resolver: zodResolver(SoftwaresSchema),
        defaultValues: {
            clientSlug: software.clientSlug,
            label: software.label,
            slug: softwareSlug
        },
    })
    const onSubmit = async (data: z.infer<typeof SoftwaresSchema>) => {
        try {
            await editSoftware(data)
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <div className="flex w-full flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="clientSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden'{...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden'{...field} required />
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
                                <FormLabel>Logiciel</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nom du logiciel" {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Nom de éditeur du logiciel
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Editer</Button>

                </form>

            </Form>
        </div>
    )
}
