"use client";
import React from "react";
import * as z from "zod"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { EnvironnementUserEditSoftwareSchema } from '@/src/helpers/definition'
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
import { editEnvironnementUserSoftware } from "@/src/features/actions/environoment_user/environement_user.actions";

export default function EditUserEnvironnementSoftware({ softwareActive, softwares }: {
    softwareActive: string,
    softwares: { slug: string, label: string }[],
}) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof EnvironnementUserEditSoftwareSchema>>({
        resolver: zodResolver(EnvironnementUserEditSoftwareSchema),
        defaultValues: {
            softwareSlug: softwareActive,
        }
    })

    const onSubmit = async (data: z.infer<typeof EnvironnementUserEditSoftwareSchema>) => {
        try {
            setLoading(true)
            const action = await editEnvironnementUserSoftware(data)
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
                    name="softwareSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logiciel</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selectionner votre logiciel actif" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {softwares.map((software) => (
                                        <SelectItem key={software.slug} value={software.slug}>
                                            {software.label}
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

