"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateSoftwareInputSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from '@/components/ui/input'
import { createSoftwareStdInput } from "@/src/features/actions/software_input/stdInput.actions"
export default function CreateSoftwareInput({ clientSlug, softwareSlug, formSlug }: { clientSlug: string, softwareSlug: string, formSlug: string }) {
    const form = useForm<z.infer<typeof CreateSoftwareInputSchema>>({
        resolver: zodResolver(CreateSoftwareInputSchema),
        defaultValues: {
            clientSlug: clientSlug,
            softwareSlug: softwareSlug,
            formSlug: formSlug,
            label: "",
            typeDataTable: "never",
            typeDataImport: "never",
            type: "text"
        },
    })

    const onSubmit = async (data: z.infer<typeof CreateSoftwareInputSchema>) => {
        try {
            const actions = await createSoftwareStdInput(data)
            if (actions?.serverError) {
                console.error(actions.serverError)
            }
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <div className="flex w-full flex-col items-center">
            <Form {...form} >
                <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="clientSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" {...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="softwareSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" {...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="formSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" {...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Libellé du champ </FormLabel>
                                <FormControl>
                                    <Input placeholder="Libellé de votre champ" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Le libellé est le nom de votre champ.
                                </FormDescription>
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
                                            <SelectValue placeholder="Texte" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="text">Texte</SelectItem>
                                        <SelectItem value="number">Numérique</SelectItem>
                                        <SelectItem value="date">Date</SelectItem>
                                        <SelectItem value="switch">Boite à cocher</SelectItem>
                                        <SelectItem value="select">Liste déroulante</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Type de valeur que vous souhaitez enregistrer
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="typeDataTable"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zone affichage cahier analyse</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Code" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="isCode">Code</SelectItem>
                                        <SelectItem value="isLabel">Libellé</SelectItem>
                                        <SelectItem value="isDescription">Description</SelectItem>
                                        <SelectItem value="never">Aucune colonne</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Zone facultative, colonne à alimenter dans les tableaux des cahiers d`&apos;analyse
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="typeDataImport"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Import de données</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Code" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="dsn">DSN</SelectItem>
                                        <SelectItem value="items">Rubriques</SelectItem>
                                        <SelectItem value="otherField">Autres formulaire</SelectItem>
                                        <SelectItem value="other">Autre donnée</SelectItem>
                                        <SelectItem value="never">Pas d&apos;import </SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Enregistrer</Button>

                </form>

            </Form>

        </div>
    )
}
