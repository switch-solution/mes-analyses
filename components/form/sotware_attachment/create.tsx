"use client";

import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { StandardTaskCreateSchema } from '@/src/helpers/definition';
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
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
import { ButtonLoading } from "@/components/ui/button-loader";
import { toast } from "sonner"
import { createSoftwareTask } from "@/src/features/actions/software_task/software_task.actions"

export default function CreateStandardAttchment({ clientSlug, softwareSlug }: { clientSlug: string, softwareSlug: string }) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof StandardTaskCreateSchema>>({
        resolver: zodResolver(StandardTaskCreateSchema),
        defaultValues: {
            clientSlug,
            softwareSlug,
            label: "",
            description: "",
            isObligatory: false,
            multiple: false,
            accept: "pdf",
        }
    })
    const onSubmit = async (data: z.infer<typeof StandardTaskCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createSoftwareTask(data)
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
            console.log(err)
            throw new Error("Erreur lors de la création de la rubrique.")
        }

    }
    return (
        <div className="flex w-full flex-col items-center">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="clientSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden"{...field} required />
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
                                    <Input type="hidden"{...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Libellé de la pièce jointe</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="KBIS" {...field} />
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
                                    <Input type="text"{...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="accept"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Format du fichier</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Format de fichier" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="pdf">PDF</SelectItem>
                                        <SelectItem value="word">Word</SelectItem>
                                        <SelectItem value="excel">Excel</SelectItem>
                                        <SelectItem value="csv">CSV</SelectItem>
                                        <SelectItem value="txt">texte</SelectItem>
                                        <SelectItem value="img">image</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isObligatory"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Document obligatoire</FormLabel>
                                    <FormDescription>
                                        Ce document est obligatoire à fournir
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="multiple"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Autoriser l&apos;envoi de plusieurs fichiers</FormLabel>
                                    <FormDescription>
                                        Vous pouvez envoyer plusieurs fichiers
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
                </form>
            </Form>
        </div>
    )
}