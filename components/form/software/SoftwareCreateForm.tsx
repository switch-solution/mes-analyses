"use client";
import { useState } from "react"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SoftwaresSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ButtonLoading } from "@/components/ui/button-loader";
import { createSoftware } from '@/src/features/actions/software/software.actions'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"

import { Input } from '@/components/ui/input'
export default function SoftwareCreateForm({ clientSlug }: { clientSlug: string }) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof SoftwaresSchema>>({
        resolver: zodResolver(SoftwaresSchema),
        defaultValues: {
            clientSlug: clientSlug,
            label: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof SoftwaresSchema>) => {
        try {
            setLoading(true)
            const action = await createSoftware(data)
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
        <div className="flex w-full flex-col items-center">
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
                                <FormLabel>Logiciel</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nom du logiciel" {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Nom de éditeur du logiciel
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

                </form>

            </Form>

        </div>
    )
}
