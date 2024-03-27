"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ProcessusCreateSchema } from "@/src/helpers/definition";
import { ButtonLoading } from "@/components/ui/button-loader";
import { createProcessus } from "@/src/features/actions/processus/processus.actions";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
export default function CreateProcessus({ clientSlug, softwareSlug }: { clientSlug: string, softwareSlug: string }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof ProcessusCreateSchema>>({
        resolver: zodResolver(ProcessusCreateSchema),
        defaultValues: {
            clientSlug: clientSlug,
            softwareSlug: softwareSlug,
            id: "",
            label: "",
            description: "",
            formUrl: "",
            descriptionUrl: "",
            level: "Logiciel",

        },
    })
    const onSubmit = async (data: z.infer<typeof ProcessusCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createProcessus(data)
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
                                <Input type="hidden" {...field} />
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
                                <Input type="hidden" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code du processus</FormLabel>
                            <FormControl>
                                <Input placeholder="Code du processus" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Niveau de paramétrage</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selectionner un niveau de paramétrage" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Client">Client</SelectItem>
                                    <SelectItem value="Logiciel">Logiciel</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé du processus</FormLabel>
                            <FormControl>
                                <Input placeholder="Société" {...field} />
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
                            <FormLabel>Description de votre projet</FormLabel>
                            <FormControl>
                                <Input placeholder="Mon nouveau projet" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="formUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL du formulaire</FormLabel>
                            <FormControl>
                                <Input placeholder="/form/Standard_0001_society" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="descriptionUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL de la description</FormLabel>
                            <FormControl>
                                <Input placeholder="/description/Standard_0001_society" {...field} />
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