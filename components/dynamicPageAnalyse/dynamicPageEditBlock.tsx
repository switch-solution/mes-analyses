"use client";

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDebouncedCallback } from 'use-debounce';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { deletePageBlock, editPageBlock, } from "@/src/features/actions/page/page.actions"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { BlockPageEditSchema, BlockEditSchema } from "@/src/helpers/definition"
import { Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
export default function DynamicPageEditBlock({ clientSlug, blockSlug, softwareSlug, pageSlug, label, type }: { clientSlug: string, softwareSlug: string, blockSlug: string, pageSlug: string, label: string, type: string }) {
    const form = useForm<z.infer<typeof BlockPageEditSchema>>({
        resolver: zodResolver(BlockPageEditSchema),
        defaultValues: {
            clientSlug,
            softwareSlug,
            blockSlug,
            pageSlug,
            label,

        }
    })
    const handleChange = useDebouncedCallback(async (data: z.infer<typeof BlockPageEditSchema>) => {
        const action = await editPageBlock(data)
        if (action?.serverError) {
            toast.error(`${action.serverError}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        } else {
            toast.success('Mise à jour du bloc', {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        }

    }, 500);
    const handleDelete = async (data: z.infer<typeof BlockPageEditSchema>) => {
        const action = await deletePageBlock(data)
        if (action?.serverError) {
            toast.error(`${action.serverError}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        } else {
            toast.success('Suppression du bloc', {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        }
    }


    return (
        <div className="flex flex-row items-center">
            <div className="flex justify-between">
                <Link href={`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit/${blockSlug}`}>
                    <Pencil />
                </Link>

                <Trash className="hover:cursor-pointer" onClick={() => handleDelete({
                    clientSlug,
                    softwareSlug,
                    blockSlug,
                    pageSlug,
                    label,
                })} />
            </div>

            <Form {...form} key={blockSlug}>
                <form onChange={form.handleSubmit(handleChange)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="clientSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} />
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
                                    <Input type='hidden' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="blockSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} />
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
                                <FormLabel>{type}</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>


    )
}
