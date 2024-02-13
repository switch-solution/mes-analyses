"use client";

import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { StandardAttachmentSchema } from '@/src/helpers/definition';
import { createStandardAttachment } from '@/src/features/actions/standardAttachment/standardAttachment.actions'
import { Input } from "@/components/ui/input"
import type { getSoftwareByUserIsEditorType } from '@/src/helpers/type';
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
export default function CreateStandardAttchment({ softwares }: { softwares: getSoftwareByUserIsEditorType[] }) {

    const form = useForm<z.infer<typeof StandardAttachmentSchema>>({
        resolver: zodResolver(StandardAttachmentSchema),
        defaultValues: {
            label: "",
            description: "",
            isObligatory: false,
            softwareId: softwares?.at(0)?.id,
        }
    })
    const onSubmit = async (data: z.infer<typeof StandardAttachmentSchema>) => {
        try {
            StandardAttachmentSchema.parse(data)
            await createStandardAttachment(data)
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
                        name="softwareId"
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
                                            <SelectItem key={software.id} value={software.id}>{software.name}</SelectItem>
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
                                    <Input placeholder="Salaire de base" {...field} />
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
                                    <Input placeholder="Salaire de base" {...field} />
                                </FormControl>
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
                                    <FormLabel className="text-base">Document obligtaitoire</FormLabel>
                                    <FormDescription>
                                        Ce document est obligatoire à fournir
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        aria-readonly
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Créer</Button>
                </form>
            </Form>
        </div>
    )
}