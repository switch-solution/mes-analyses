"use client";
import * as z from "zod"
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { ButtonLoading } from "@/components/ui/button-loader";
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { createApiKey } from "@/src/features/actions/client/client.action"
import { CreateApiKeysSchema } from "@/src/helpers/definition";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
export default function CreateApiKey({ clientSlug }: { clientSlug: string }) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof CreateApiKeysSchema>>({
        resolver: zodResolver(CreateApiKeysSchema),
        defaultValues: {
            clientSlug: clientSlug,
            label: "",
            limit: 0,

        },
    })

    const onSubmit = async (data: z.infer<typeof CreateApiKeysSchema>) => {
        try {
            setLoading(true)

            const action = await createApiKey(data)
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
            setLoading(false)
            console.error(err)
        }

    }
    return (
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
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé</FormLabel>
                            <FormControl>
                                <Input placeholder="API dev" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="limit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Utilisation maximum par jour</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder="10" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

            </form>

        </Form>
    )

} 