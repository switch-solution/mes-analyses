"use client"
import { useState } from "react"
import { SetupLegalSchema } from "@/src/helpers/definition";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Switch } from "@/components/ui/switch"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { createSetupLegal } from "@/src/features/actions/setup/setup.actions"
import { ButtonLoading } from "@/components/ui/button-loader";
import { toast } from "sonner"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

export function CreateCgv() {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof SetupLegalSchema>>({
        resolver: zodResolver(SetupLegalSchema),
        defaultValues: {
            cgv: false,
            gdpr: false,
        },
    })
    const onSubmit = async (data: z.infer<typeof SetupLegalSchema>) => {
        try {
            setLoading(true)
            const action = await createSetupLegal(data)
            if (action?.serverError) {
                setLoading(true)
                toast(`${action.serverError}`, {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                })
            }
        } catch (err) {
            setLoading(true)
            console.error(err)
        }

    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div>
                    <h3 className="mb-4 text-lg font-medium">CGV</h3>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="cgv"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Condition général de vente
                                        </FormLabel>
                                        <FormDescription>
                                            Je valide les CGV
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
                            name="gdpr"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">RGPD</FormLabel>
                                        <FormDescription>
                                            Je valide les RGPD
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
                    </div>
                </div>
                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

            </form>
        </Form>


    )
}
