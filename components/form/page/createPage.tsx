"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createPage } from "@/src/features/actions/page/page.actions";
import { PageCreateSchema } from "@/src/helpers/definition";
import { ButtonLoading } from "@/components/ui/button-loader";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
export default function CreatePage({ clientSlug, softwareSlug }: { clientSlug: string, softwareSlug: string }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof PageCreateSchema>>({
        resolver: zodResolver(PageCreateSchema),
        defaultValues: {
            clientSlug: clientSlug,
            softwareSlug: softwareSlug,
            label: "",
            internalId: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof PageCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createPage(data)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="clientSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="softwareSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="internalId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code de votre page</FormLabel>
                            <FormControl>
                                <Input placeholder="STD_001" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de votre de page</FormLabel>
                            <FormControl>
                                <Input placeholder="Page société" required {...field} />
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