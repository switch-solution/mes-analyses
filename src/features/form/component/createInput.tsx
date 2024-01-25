"use client";
import React, { DispatchWithoutAction, ReactEventHandler } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { createStandardInput } from "@/src/features/actions/component/component.action";

import { StandardComposantInputSchema } from '@/src/helpers/definition';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

export default function CreateInput({ type, composantId, setFormIsActive }: {
    type: 'text' | 'number', composantId: string, setFormIsActive: (name: boolean) => void;
}) {
    const form = useForm<z.infer<typeof StandardComposantInputSchema>>({
        resolver: zodResolver(StandardComposantInputSchema),
        defaultValues: {
            type: type,
            label: "",
            required: false,
            readonly: false,
            minLength: type === 'text' ? 0 : undefined,
            maxLength: type === 'text' ? 0 : undefined,
            standard_ComposantId: composantId

        }
    })
    const onSubmit = async (values: z.infer<typeof StandardComposantInputSchema>) => {
        try {
            await StandardComposantInputSchema.parseAsync(values)
            await createStandardInput(values)
            setFormIsActive(false)
        } catch (err) {
            setFormIsActive(false)

            console.error(err)
        }

    }
    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} readOnly required />
                                </FormControl>
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="standard_ComposantId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} readOnly required />
                                </FormControl>
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Libellé du champ</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="" {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Indiquer un nom clair et précis pour le champ
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="required"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Champ obligatoire
                                    </FormLabel>
                                    <FormDescription>
                                        Cette option rendra le champ obligatoire pour  l&apos;utilisateur.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="readonly"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Champ en lecture seule
                                    </FormLabel>
                                    <FormDescription>
                                        Cette option non éditable
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {type === 'text' ?
                        (
                            <>
                                <FormField
                                    control={form.control}
                                    name="minLength"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre minimum de caractère</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} required />
                                            </FormControl>
                                            <FormDescription>
                                                Indiquer un nom clair et précis pour le champ
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maxLength"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre maxiumum de caractère</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} required />
                                            </FormControl>
                                            <FormDescription>
                                                Indiquer un nom clair et précis pour le champ
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>

                        ) : undefined

                    }
                    <Button type="submit">Sauvegarder</Button>

                </form>
            </Form>
        </div>
    )
}