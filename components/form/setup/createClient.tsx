"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SetupClientSchema } from "@/src/helpers/definition";
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

import { Input } from '@/components/ui/input'
import { createSetupClient } from "@/src/features/actions/setup/setup.actions";
import { toast } from "sonner"


export default function CreateClient() {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof SetupClientSchema>>({
        resolver: zodResolver(SetupClientSchema),
        defaultValues: {
            socialReason: "",
            siren: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof SetupClientSchema>) => {
        try {
            setLoading(true)
            const action = await createSetupClient(data)
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">

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
                    {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
                </form>
            </Form>

        </div>
    )
}
