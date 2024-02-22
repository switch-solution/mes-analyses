"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { EdidStdInputSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { editStdInput } from '@/src/features/actions/stdInput/stdInput.actions'
import type { getStandardInputById } from '@/src/query/standardInput.query'
import { Switch } from "@/components/ui/switch"

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
export default function EditStdInput({ clientSlug, componentSlug, input }: { clientSlug: string, componentSlug: string, input: getStandardInputById }) {
    const form = useForm<z.infer<typeof EdidStdInputSchema>>({
        resolver: zodResolver(EdidStdInputSchema),
        defaultValues: {
            clientSlug: clientSlug,
            componentSlug: componentSlug,
            id: input.id,
            defaultValue: input.defaultValue ? input.defaultValue : '',
            label: input.label,
            minLength: input.minLength ? input.minLength : 0,
            maxLength: input.maxLength ? input.maxLength : 255,
            required: input.required ? input.required : false,
            readonly: input.readonly ? input.readonly : false,
            placeholder: input.placeholder ? input.placeholder : 'Saisir une valeur',
            minValue: input.minValue ? input.minValue : 0,
            maxValue: input.maxValue ? input.maxValue : 9999,
        },
    })
    const onSubmit = async (data: z.infer<typeof EdidStdInputSchema>) => {
        try {
            const action = await editStdInput(data)
            console.log(action?.serverError)
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="clientSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" {...field} required />
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
                                    <Input type="hidden" {...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" {...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Libellé</FormLabel>
                                <FormControl>
                                    <Input placeholder="Libellé de votre champ" {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Le libellé est le nom de votre champ.
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
                                        Champ en lecture seul
                                    </FormLabel>
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


                    {input.type === 'text' &&
                        <>
                            <FormField
                                control={form.control}
                                name="minLength"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre miniumum de caractère</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            La valeur doit etre positive
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
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            La valeur doit etre positive
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="placeholder"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Placeholder</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Donner un exemple de valeur à saisir
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="defaultValue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valeur par default</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Saisir une valeur par default
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>



                    }
                    <Button type="submit">Enregistrer</Button>

                </form>

            </Form>

        </div>
    )
}

