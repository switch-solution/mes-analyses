"use client";
import React from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SetupProfilSchema } from "@/src/helpers/definition";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
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
import { Input } from '@/components/ui/input'
import { createSetupProfil } from "@/src/features/actions/setup/setup.actions";

export default function CreateProfil() {

    const form = useForm<z.infer<typeof SetupProfilSchema>>({
        resolver: zodResolver(SetupProfilSchema),
        defaultValues: {
            civility: "",
            firstname: "",
            lastname: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof SetupProfilSchema>) => {
        try {
            const action = await createSetupProfil(data)
            if (action) {
                console.log(action)
            }
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="civility"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Civilité</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Indiquer votre civilité" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="M">Monsieur</SelectItem>
                                        <SelectItem value="Mme">Madame</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="DUPONT" type="text" {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Henry" type="text" {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />

                    <Button type="submit">Envoyer</Button>

                </form>
            </Form>
        </div>

    )
}