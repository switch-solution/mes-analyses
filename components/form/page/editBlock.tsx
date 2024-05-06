"use client";
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Input } from "@/components/ui/input";
import { BlockEditSchema } from "@/src/helpers/definition";
import { Button } from "@/components/ui/button";
import { editBlock } from "@/src/features/actions/page/page.actions";
export default function EditBlock({ blockSlug, clientSlug, pageSlug, softwareSlug }: { blockSlug: string, clientSlug: string, pageSlug: string, softwareSlug: string }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof BlockEditSchema>>({
        resolver: zodResolver(BlockEditSchema),
        defaultValues: {
            blockSlug,
            clientSlug,
            softwareSlug,
            pageSlug,
            min: 1,
            max: 99999,
            minLength: 1,
            maxLength: 255,
            buttonLabel: 'Valider',
            required: false,
            readonly: false,


        }
    })
    const onSubmit = async (data: z.infer<typeof BlockEditSchema>) => {
        try {
            setLoading(true)
            const action = await editBlock(data)
            if (action?.serverError) {
                setLoading(false)
                toast(`${action.serverError}`, {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                })
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error(err)

        }
    }
    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="clientSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='hidden' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="softwareSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='hidden' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="blockSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='hidden' {...field} />
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
                            <FormLabel>Libellé du champ</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="min"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valeur minimum</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="max"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valeur maximum</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
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
                                <Input type="number" placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
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
                            <FormLabel>Nombre minimum de caractère</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
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
                                <FormLabel className="text-base">Champ requis</FormLabel>
                                <FormDescription>
                                    Le champ est obligatoire.
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
                                <FormLabel className="text-base">Lecture seul</FormLabel>
                                <FormDescription>
                                    Le champ est en lecture seul.
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

                <Button type="submit">Mettre à jour</Button>
            </form>
        </Form>

    )


}




