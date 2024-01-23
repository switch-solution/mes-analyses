"use client";

import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SoftwaresSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createSoftware } from '../../../../../src/features/actions/software/software.actions'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
export default function SoftwareForm({ params }: { params: { id: string } }) {
    const form = useForm<z.infer<typeof SoftwaresSchema>>({
        resolver: zodResolver(SoftwaresSchema),
        defaultValues: {
            provider: "",
            name: "",
            clientId: params.id,
        },
    })
    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form action={createSoftware} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="clientId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} readOnly required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="provider"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Editeur</FormLabel>
                                <FormControl>
                                    <Input placeholder="Editeur" {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Raison socicale de éditeur
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logiciel</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nom du logiciel" {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Nom de éditeur du logiciel
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Inviter</Button>

                </form>

            </Form>
        </div>
    )
}
