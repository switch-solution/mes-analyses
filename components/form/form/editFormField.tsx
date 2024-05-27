"use client";
import { useState } from "react";
import { FieldCreatSchema, FieldDeleleteSchema } from "@/src/helpers/definition";
import { Pencil, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { ButtonLoading } from "@/components/ui/button-loader"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { createField } from "@/src/features/actions/form/form.actions"
import { deleteField } from "@/src/features/actions/field/field.actions"
import { toast } from "sonner"
export default function EditFormField({
    clientSlug,
    softwareSlug,
    formProps,
    fields
}: {
    clientSlug: string,
    softwareSlug: string,
    formProps: {
        id: string,
        version: number,
        label: string,
        slug: string,
        description?: string | null,
    },
    fields: {
        id: string,
        label: string,
        type: string,
        slug: string,
    }[]
}) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof FieldCreatSchema>>({
        resolver: zodResolver(FieldCreatSchema),
        defaultValues: {
            clientSlug: clientSlug,
            softwareSlug: softwareSlug,
            formSlug: formProps.slug,
            label: "",
            type: "Champ texte",
        },
    })
    const onSubmit = async (data: z.infer<typeof FieldCreatSchema>) => {
        try {
            setLoading(true)
            const action = await createField(data)
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
        <div>
            <ul>
                <li className="ml-2">Code du formulaire : {formProps.id}</li>
                <li className="ml-2">Libellé du formulaire : {formProps.label}</li>
                <li className="ml-2">Version du formulaire : {formProps.version}</li>
            </ul>
            <div>
                {fields.map(field => {
                    return (
                        <ul key={field.id} className="flex flex-row">
                            <li className="ml-2 hover:cursor-pointer" onClick={async () => {
                                const action = await deleteField({
                                    clientSlug,
                                    softwareSlug,
                                    formSlug: formProps.slug,
                                    fieldSlug: field.slug
                                })
                                if (action?.serverError) {
                                    toast(`${action.serverError}`, {
                                        description: new Date().toLocaleDateString(),
                                        action: {
                                            label: "fermer",
                                            onClick: () => console.log("fermeture"),
                                        },
                                    })
                                } else {
                                    toast(`Suppression du champ`, {
                                        description: new Date().toLocaleDateString(),
                                        action: {
                                            label: "fermer",
                                            onClick: () => console.log("fermeture"),
                                        },
                                    })
                                }
                            }}><Trash /></li>
                            <li className="ml-2"><Link href={`/client/${clientSlug}/editor/${softwareSlug}/form/${formProps.slug}/field/${field.slug}`}><Pencil /></Link></li>
                            <li className="ml-2">Libellé : {field.label}</li>
                            <li className="ml-2">Type de champ : {field.type}</li>
                        </ul>
                    )
                })}
            </div>
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
                                <FormLabel>Libellé de votre champ</FormLabel>
                                <FormControl>
                                    <Input placeholder="Page société" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type de champ</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Champ texte">Champ texte</SelectItem>
                                        <SelectItem value="Champ numérique">Champ numérique</SelectItem>
                                        <SelectItem value="Boite à cocher">Boite à cocher</SelectItem>
                                        <SelectItem value="Liste déroulante">Liste déroulante</SelectItem>
                                    </SelectContent>
                                </Select>
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