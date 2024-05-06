"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { duplicatePage } from "@/src/features/actions/page/page.actions";
import { PageDuplicateSchema } from "@/src/helpers/definition";
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
export default function DuplicatePage({ clientSlug, pageSlug, projectSlug }: { clientSlug: string, pageSlug: string, projectSlug: string }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof PageDuplicateSchema>>({
        resolver: zodResolver(PageDuplicateSchema),
        defaultValues: {
            clientSlug: clientSlug,
            pageSlug: pageSlug,
            projectSlug: projectSlug,
            label: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof PageDuplicateSchema>) => {
        try {
            setLoading(true)
            const action = await duplicatePage(data)
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
                    name="pageSlug"
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
                    name="projectSlug"
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