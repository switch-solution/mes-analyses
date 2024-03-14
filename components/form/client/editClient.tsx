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
            ape: client?.ape ? client?.ape : "",
            address1: client?.address1 ? client?.address1 : "",
            address2: client?.address2 ? client?.address2 : "",
            address3: client?.address3 ? client?.address3 : "",
            address4: client?.address4 ? client?.address4 : "",
            city: client?.city ? client?.city : "",
            codeZip: client?.codeZip ? client?.codeZip : "",
            country: client?.country ? client?.country : "",
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
                    <FormField
                        control={form.control}
                        name="ape"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>APE</FormLabel>
                                <FormControl>
                                    <Input minLength={5} maxLength={5} placeholder="Code APE" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />

                    <FormField
                        control={form.control}
                        name="address1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse 1</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="address2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse 2</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="address3"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse 3</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ville</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name="codeZip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code postal</FormLabel>
                                <FormControl>
                                    <Input minLength={5} maxLength={5} placeholder="Rue de la victoire" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pays</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" {...field} required />
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