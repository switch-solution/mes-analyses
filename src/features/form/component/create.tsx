"use client";

import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { StandardComposantSchema } from '@/src/helpers/definition';
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createComponent } from '@/src/features/actions/component/component.action'
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
import type { getMyClientActiveType } from '@/src/helpers/type'
export default function CreateFormComponent({ clientId, softwares }: {
    clientId: getMyClientActiveType,
    softwares: { id: string, provider: string, name: string }[]
}) {
    const form = useForm<z.infer<typeof StandardComposantSchema>>({
        resolver: zodResolver(StandardComposantSchema),
        defaultValues: {
            title: "",
            clientId: clientId,
            description: "",
            status: "actif",
            softwareId: softwares?.at(0)?.id,
            type: 'form'
        },
    })
    const createComponentWithClientId = createComponent.bind(null, clientId)
    const onSubmit = async (values: z.infer<typeof StandardComposantSchema>) => {
        try {
            await createComponentWithClientId(values)
        } catch (err) {
            console.error(err)
        }
    }
    return (

        <div className="flex flex-col w-full items-center">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="status"
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
                        name="softwareId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logiciel</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner un logiciel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {softwares.map((software) => (
                                            <SelectItem key={software.id} value={software.id}>{software.name}</SelectItem>
                                        ))}

                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type de composant</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Un type de composant" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='form'>Formulaire</SelectItem>
                                        <SelectItem value='textarea'>Zone de texte</SelectItem>
                                        <SelectItem value='image'>Image</SelectItem>

                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
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
                    <Button type="submit">Envoyer</Button>

                </form>
            </Form>
        </div >
    )
}