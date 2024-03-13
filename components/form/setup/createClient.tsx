"use client";
import React from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SetupClientSchema } from "@/src/helpers/definition";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

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
import { createSetupClient } from "@/src/features/actions/setup/setup.actions";
import { ToastAction } from "@/components/ui/toast"


export default function CreateClient() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof SetupClientSchema>>({
        resolver: zodResolver(SetupClientSchema),
        defaultValues: {
            socialReason: "",
            siren: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof SetupClientSchema>) => {
        try {
            const values = await createSetupClient(data)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })



        } catch (err) {
            console.error(err)
        }

    }

    return (
        <div className="flex w-full flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="siren"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>SIREN</FormLabel>
                                <FormControl>
                                    <Input placeholder="123456789" type="text" maxLength={9} min={1} required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="socialReason"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Raison sociale</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ma société" type="text" required {...field} />
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
