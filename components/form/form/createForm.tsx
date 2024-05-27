"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createForm } from "@/src/features/actions/form/form.actions"
import { FormCreateSchema } from "@/src/helpers/definition";
import { ButtonLoading } from "@/components/ui/button-loader";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export default function CreateForm({ clientSlug, softwareSlug, refs }: {
    clientSlug: string,
    softwareSlug: string,
    refs: {
        id: string,
        label: string,
        Software_Setting_Value: {
            slug: string,
            value: string

        }[]
    }
}) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof FormCreateSchema>>({
        resolver: zodResolver(FormCreateSchema),
        defaultValues: {
            clientSlug: clientSlug,
            softwareSlug: softwareSlug,
            label: "",
            description: "",
            internalId: "",
            repository: ''
        },
    })

    const onSubmit = async (data: z.infer<typeof FormCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createForm(data)
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
                            <FormLabel>Code de votre formulaire</FormLabel>
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
                            <FormLabel>Nom de votre de formulaire</FormLabel>
                            <FormControl>
                                <Input placeholder="Page société" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Formulaire de création des sociétés" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="repository"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Formulaire référentiel</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Facultatif" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {refs.Software_Setting_Value.map(ref => <SelectItem key={ref.slug} value={ref.slug}>{ref.value}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Zone facultative. Cette option permet de saisir les éléments du référentiel avec ce formulaire.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
            </form>
        </Form>

    )
}