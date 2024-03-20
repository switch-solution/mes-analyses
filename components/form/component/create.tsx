"use client";

import { useState } from 'react'
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
import { ButtonLoading } from "@/components/ui/button-loader";

export default function CreateFormComponent({ clientSlug, softwareSlug }: {
    clientSlug: string,
    softwareSlug: string
}) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof StandardComposantSchema>>({
        resolver: zodResolver(StandardComposantSchema),
        defaultValues: {
            label: "",
            softwareSlug,
            clientSlug,
            description: "",
            status: "actif",
            type: 'form'
        },
    })
    const onSubmit = async (values: z.infer<typeof StandardComposantSchema>) => {
        try {
            setLoading(true)
            const action = await createComponent(values)
            if (action?.serverError) {
                console.log(action.serverError)
            }
            setLoading(true)
        } catch (err) {
            setLoading(true)
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
                    {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

                </form>
            </Form>
        </div >
    )
}