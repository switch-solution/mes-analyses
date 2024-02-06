"use client";
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { createStandardInput } from "@/src/features/actions/component/component.action";
import { StandardComposantInputSchema } from '@/src/helpers/definition';
import { Textarea } from '@/components/ui/textarea';
import type { InputStandardType } from "@/src/helpers/type"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"
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

export default function CreateInput({ composantId }: { composantId: string }) {
    const [type, setType] = useState<InputStandardType | undefined>()
    const form = useForm<z.infer<typeof StandardComposantInputSchema>>({
        resolver: zodResolver(StandardComposantInputSchema),
        defaultValues: {
            type: type,
            label: "",
            required: false,
            readonly: false,
            placeholder: "",
            order: 1,
            multiple: false,
            textArea: "",
            isCode: false,
            isLabel: false,
            isDescription: false,
            minLength: 1,
            maxLength: 255,
            standard_ComposantId: composantId

        }
    })
    const formChoice = useForm({
        defaultValues: {
            type: type
        }

    })
    const onSubmit = async (values: z.infer<typeof StandardComposantInputSchema>) => {
        try {
            StandardComposantInputSchema.parse(values)
            await createStandardInput(values)
        } catch (err) {
            console.error(err)
        }

    }
    const onSubmitChoiceType = async (values: any) => {
        setType(() => values.type)
        console.log(type)
    }
    return (<div className="flex flex-col w-full items-center">
        {!type ?
            <Form {...formChoice} >
                <form onSubmit={formChoice.handleSubmit(onSubmitChoiceType)} className='space-y-8'>
                    <FormField
                        control={formChoice.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Selectionner un type de champ</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Texte" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="text">Texte</SelectItem>
                                        <SelectItem value="number">Numérique</SelectItem>
                                        <SelectItem value="date">Date</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Continuer</Button>

                </form>

            </Form>
            :
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="type"
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
                                        <SelectItem value="text">Texte</SelectItem>
                                        <SelectItem value="number">Numérique</SelectItem>
                                        <SelectItem value="date">Date</SelectItem>
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
                    <FormField
                        control={form.control}
                        name="isCode"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Champ code de la présentation
                                    </FormLabel>
                                    <FormDescription>
                                        Ce champ sera le code dans la présentation
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
                        name="isDescription"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Champ code description
                                    </FormLabel>
                                    <FormDescription>
                                        Ce champ sera la description
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
                        name="isLabel"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Champ intitulé
                                    </FormLabel>
                                    <FormDescription>
                                        Sera le titre du champ
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


                    <Button type="submit">Sauvegarder</Button>

                </form>
            </Form>
        }
    </div>
    )
}