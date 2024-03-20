"use client";

import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { StandardComposantEditSchema } from '@/src/helpers/definition';
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { editComponent } from '@/src/features/actions/component/component.action'
import type { getStdComponentBySlug } from '@/src/query/software_component.query'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
export default function EditFormComponent({ clientSlug, component }: {
    clientSlug: string,
    component: getStdComponentBySlug,
}) {
    const form = useForm<z.infer<typeof StandardComposantEditSchema>>({
        resolver: zodResolver(StandardComposantEditSchema),
        defaultValues: {
            label: component.label,
            clientSlug,
            description: component.description ?? '',
            status: component.status === 'actif' ? 'actif' : 'archivé',
            componentSlug: component.slug
        },
    })
    const onSubmit = async (values: z.infer<typeof StandardComposantEditSchema>) => {
        try {
            await editComponent(values)
        } catch (err) {
            console.error(err)
        }
    }
    return (

        <div className="flex w-full flex-col items-center">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="clientSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="componentSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Titre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Editeur" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Titre du composant
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Editeur" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Titre du composant
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
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
                    <Button type="submit">Envoyer</Button>

                </form>
            </Form>
        </div >
    )
}