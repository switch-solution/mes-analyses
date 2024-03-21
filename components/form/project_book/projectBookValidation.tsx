"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ValidationBookSchema } from "@/src/helpers/definition"
import { validationProjectBook } from "@/src/features/actions/project_Book/project_book.actions";
import { ButtonLoading } from "@/components/ui/button-loader";

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
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
export default function ProjectBookValidation({ clientSlug, projectSlug, bookSlug }: { clientSlug: string, projectSlug: string, bookSlug: string }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof ValidationBookSchema>>({
        resolver: zodResolver(ValidationBookSchema),
        defaultValues: {
            clientSlug: clientSlug,
            projectSlug: projectSlug,
            bookSlug: bookSlug,
            isValid: false,
            comment: "",

        },
    })
    const onSubmit = async (data: z.infer<typeof ValidationBookSchema>) => {
        try {
            setLoading(true)
            const action = await validationProjectBook(data)
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

        } catch (err) {
            console.error(err)
        }

    }
    return (
        < Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name="clientSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" readOnly {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="bookSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" readOnly {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />

                <FormField
                    control={form.control}
                    name="projectSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" readOnly {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="isValid"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Validation du cahier
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
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Saisir un commentaire</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
            </form>
        </Form >

    )
}