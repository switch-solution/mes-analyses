"use client";
import * as z from "zod"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { SettingCreateSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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


import { createSoftwareSetting } from "@/src/features/actions/software_setting/software_setting.actions"
import { Input } from '@/components/ui/input'
import { toast } from "sonner"

export default function CreateSoftwareSetting({ clientSlug, softwareSlug }: { clientSlug: string, softwareSlug: string }) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof SettingCreateSchema>>({
        resolver: zodResolver(SettingCreateSchema),
        defaultValues: {
            clientSlug: clientSlug,
            label: "",
            id: "",
            description: "",
            softwareSlug: softwareSlug,


        },
    })
    const onSubmit = async (data: z.infer<typeof SettingCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createSoftwareSetting(data)
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
                    name="softwareSlug"
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
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="" {...field} required />
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
                                <Input type="text" placeholder="" {...field} required />
                            </FormControl>
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
                                <Input placeholder="La description de mon paramètre" {...field} />
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
