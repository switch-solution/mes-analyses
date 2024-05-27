"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { editForm } from "@/src/features/actions/form/form.actions"
import { FormEditSchema } from "@/src/helpers/definition";
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
export default function EditForm({
    clientSlug,
    softwareSlug,
    formSlug,
    formData,
    refs

}: {
    clientSlug: string,
    softwareSlug: string,
    formSlug: string,
    formData: {
        label: string,
        status: 'Actif' | 'Archivé' | 'En attente',
        description: string | null,
        repository: string | null

    },
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
    const form = useForm<z.infer<typeof FormEditSchema>>({
        resolver: zodResolver(FormEditSchema),
        defaultValues: {
            clientSlug: clientSlug,
            formSlug: formSlug,
            softwareSlug: softwareSlug,
            label: formData.label,
            repository: formData.repository ? formData.repository : '',
            description: formData?.description ? formData.description : '',
            status: formData.status as 'Archivé' | 'En attente' | 'Validé' // Update the type of status
        },
    })

    const onSubmit = async (data: z.infer<typeof FormEditSchema>) => {
        try {
            setLoading(true)
            const action = await editForm(data)
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
                    name="formSlug"
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
                            <FormLabel>Libellé de la page</FormLabel>
                            <FormControl>
                                <Input type='text' required {...field} />
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
                            <FormLabel>Description de la page</FormLabel>
                            <FormControl>
                                <Input type='text' required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Validé">Validé</SelectItem>
                                    <SelectItem value="En attente">En attente</SelectItem>
                                    <SelectItem value="Archivé">Archivé</SelectItem>
                                </SelectContent>
                            </Select>

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