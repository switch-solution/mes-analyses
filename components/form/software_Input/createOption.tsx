"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CreateOptionSchema } from "@/src/helpers/definition"
import { createOption } from "@/src/features/actions/software_input/stdInput.actions";
import { Input } from '@/components/ui/input'
import { Switch } from "@/components/ui/switch"

export default function CreateOption({ clientSlug, componentSlug, inputSlug }: { clientSlug: string, componentSlug: string, inputSlug: string }) {
    const form = useForm<z.infer<typeof CreateOptionSchema>>({
        resolver: zodResolver(CreateOptionSchema),
        defaultValues: {
            clientSlug,
            componentSlug,
            inputSlug,

        },
    })
    const onSubmit = async (data: z.infer<typeof CreateOptionSchema>) => {
        try {
            const actions = await createOption(data)
            if (actions?.serverError) {
                console.error(actions.serverError)
            }
        } catch (err) {
            console.error(err)
        }

    }
    return (

        <Form {...form} >
            <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
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
                    name="inputSlug"
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
                            <FormLabel>Valeur de la liste </FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Mon champ" {...field} />
                            </FormControl>
                            <FormDescription>
                                Option
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="selected"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Valeur par default
                                </FormLabel>
                                <FormDescription>
                                    Activer cette valeur par default
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
                <Button type="submit">Ajouter une option</Button>
            </form>
        </Form>
    )
}