"use client";

import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { StandardAttachmentCreateSchema } from '@/src/helpers/definition';
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import type { getMySoftware } from "@/src/query/user.query"
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
export default function CreateStandardAttchment({ clientSlug, softwares }: { clientSlug: string, softwares: getMySoftware }) {

    const form = useForm<z.infer<typeof StandardAttachmentCreateSchema>>({
        resolver: zodResolver(StandardAttachmentCreateSchema),
        defaultValues: {
            clientSlug,
            label: "",
            description: "",
            isObligatory: false,
            softwareLabel: softwares.at(0)?.softwareLabel,
            multiple: false,
            accept: "pdf",
            deadline: 1
        }
    })
    const onSubmit = async (data: z.infer<typeof StandardAttachmentCreateSchema>) => {
        try {
        } catch (err) {
            console.log(err)
            throw new Error("Erreur lors de la création de la rubrique.")
        }

    }
    return (
        <div className="flex flex-col w-full items-center">
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
                        name="softwareLabel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logiciel</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner votre logiciel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {softwares.map((software) => (
                                            <SelectItem key={software.softwareLabel} value={software.softwareLabel}>{software.softwareLabel}</SelectItem>
                                        ))}
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
                                <FormLabel>Libellé de la pièce jointe</FormLabel>
                                <FormControl>
                                    <Input placeholder="KBIS" {...field} />
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
                                <FormLabel>Description du document</FormLabel>
                                <FormControl>
                                    <Input placeholder="Fichier au format dsn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre de jours pour founir le document</FormLabel>
                                <FormControl>
                                    <Input type="number" min={1} placeholder="Fichier au format dsn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Le nombre de jour de ce champ sera ajouté à la date de création du projet.
                                    Par exemple si vous indiquez 15 alors pour un projet ajouté le 01/01/XXXX la date limite sera le 16/01/XXXX
                                </FormDescription>
                                <FormMessage />
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
                    <Button type="submit">Ajouter</Button>
                </form>
            </Form>
        </div>
    )
}