"use client";
import React from "react";

import * as z from "zod"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { EnvironnementUserEditClientSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ButtonLoading } from "@/components/ui/button-loader";
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { editEnvironnementUserClient } from "@/src/features/actions/environoment_user/environement_user.actions";

export default function EditUserEnvironnementClient({ clientActive, clients }: {
    clientActive: string,
    clients: { slug: string, socialReason: string, siren: string }[]
}) {

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof EnvironnementUserEditClientSchema>>({
        resolver: zodResolver(EnvironnementUserEditClientSchema),
        defaultValues: {
            clientSlug: clientActive,
        }
    })

    const onSubmit = async (data: z.infer<typeof EnvironnementUserEditClientSchema>) => {
        try {
            setLoading(true)
            const action = await editEnvironnementUserClient(data)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name="clientSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selectionner votre client par actif" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {clients && clients.map((client) => (
                                        <SelectItem key={client.slug} value={client.slug}>
                                            {client.socialReason}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

            </form>
        </Form>


    )

}

