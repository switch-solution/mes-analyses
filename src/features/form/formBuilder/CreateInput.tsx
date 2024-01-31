"use client";
import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { createStandardInput } from "@/src/features/actions/component/component.action";
import CreateSelectOption from "./CreateSelectOption";
import { StandardComposantInputSchema } from '@/src/helpers/definition';
import { Textarea } from '@/components/ui/textarea';
import type { InputStandardType } from "@/src/helpers/type"

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

export default function CreateInput({ type, composantId, setFormIsActive, order }: {
    type: InputStandardType, composantId: string, setFormIsActive: (name: boolean) => void, order: number
}) {

    const form = useForm<z.infer<typeof StandardComposantInputSchema>>({
        resolver: zodResolver(StandardComposantInputSchema),
        defaultValues: {
            type: type ? type : 'text',
            label: "",
            required: false,
            readonly: false,
            placeholder: "",
            order: order,
            multiple: false,
            textArea: "",
            minLength: 1,
            maxLength: 255,
            standard_ComposantId: composantId

        }
    })
    const onSubmit = async (values: z.infer<typeof StandardComposantInputSchema>) => {
        try {
            console.log(values)
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
            <h2>Création d&apos;un champ de type : {type}</h2>
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
                        name="order"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" placeholder="" {...field} required />
                                </FormControl>
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
                                    name="placeholder"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Placeholder</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Indiquer un exemple de valeur pour le champ
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="minLength"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre minimum de caractère</FormLabel>
                                            <FormControl>
                                                <Input type="number" min={1} {...field} />
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
                                            <FormLabel>Nombre maximum de caractère</FormLabel>
                                            <FormControl>
                                                <Input type="number" min={1} {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Indiquer un nom clair et précis pour le champ
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>

                        ) :
                        type === 'number' ?
                            <>
                                <FormField
                                    control={form.control}
                                    name="minValue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Valeur minimum</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maxValue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Valeur maximum</FormLabel>
                                            <FormControl>
                                                <Input type="number"  {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                            :
                            type === 'select' ?
                                <>
                                    <FormField
                                        control={form.control}
                                        name="multiple"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Possibilité de sélection multiple
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Permet à l&apos;utilisateur de sélectionner plusieurs valeurs
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
                                    <CreateSelectOption />
                                </>
                                :
                                type === 'textArea' ?
                                    <FormField
                                        control={form.control}
                                        name="textArea"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us a little bit about yourself"
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    You can <span>@mention</span> other users and organizations.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    : undefined

                    }
                    <div className='flex w-full justify-between'>
                        <Button type="submit">Sauvegarder</Button>
                        <Button onClick={() => setFormIsActive(false)} variant="destructive" type="button">Annuler</Button>
                    </div>


                </form>
            </Form>

        </div>
    )
}