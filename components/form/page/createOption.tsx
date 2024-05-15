"use client";
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { BlockOptionCreateSchema } from "@/src/helpers/definition";
import { Button } from "@/components/ui/button";
import { createBlockOption } from "@/src/features/actions/page/page.actions";
export default function CreateOption({ blockSlug,
    clientSlug,
    pageSlug,
    softwareSlug,
}:
    {
        blockSlug: string,
        clientSlug: string,
        pageSlug: string,
        softwareSlug: string
    }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof BlockOptionCreateSchema>>({
        resolver: zodResolver(BlockOptionCreateSchema),
        defaultValues: {
            blockSlug,
            clientSlug,
            softwareSlug,
            pageSlug,
            label: '',


        }
    })
    const onSubmit = async (data: z.infer<typeof BlockOptionCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createBlockOption(data)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="clientSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='hidden' {...field} />
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
                                <Input type='hidden' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="blockSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='hidden' {...field} />
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
                            <FormLabel>Libellé de la valeur</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ajouterv une valeur à la liste déroulante
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Ajouter un élément</Button>
            </form>
        </Form>

    )


}




