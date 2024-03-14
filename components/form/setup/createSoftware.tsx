"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SetupSoftwareSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ButtonLoading } from "@/components/ui/button-loader";
import { createSetupSoftware } from "@/src/features/actions/setup/setup.actions"
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
export default function CreateSoftware() {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof SetupSoftwareSchema>>({
        resolver: zodResolver(SetupSoftwareSchema),
        defaultValues: {
            label: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof SetupSoftwareSchema>) => {
        try {
            setLoading(true)
            const action = await createSetupSoftware(data)
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
        <div className="flex w-full flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
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
