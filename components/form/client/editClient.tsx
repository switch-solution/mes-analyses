"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { editClient } from "@/src/features/actions/client/client.action";
import { ButtonLoading } from "@/components/ui/button-loader";
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ClientEditFormSchema } from "@/src/helpers/definition";
export default function EditClient({ slug, client }: { slug: string, client: any }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof ClientEditFormSchema>>({
        resolver: zodResolver(ClientEditFormSchema),
        defaultValues: {
            clientSlug: slug,
            socialReason: client?.socialReason,
        },
    })

    const onSubmit = async (data: z.infer<typeof ClientEditFormSchema>) => {
        try {
            setLoading(true)
            const action = await editClient(data)
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
            setLoading(true)
        } catch (err) {
            setLoading(true)
            console.error(err)
        }

    }
    return (
        <div className="flex w-full flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="clientSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" required {...field} />
                                </FormControl>
                            </FormItem>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name="socialReason"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Raison social</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Ma société" required {...field} />
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