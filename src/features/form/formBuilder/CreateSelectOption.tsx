"use client";
import React from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { StandardComposantSelectionOptionSchema } from '@/src/helpers/definition';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

export default function CreateSelectOption() {
    const form = useForm<z.infer<typeof StandardComposantSelectionOptionSchema>>({
        resolver: zodResolver(StandardComposantSelectionOptionSchema),
        defaultValues: {
            label: "",
            value: "",
            selected: false,
        }

    })

    return (
        <div className="flex flex-col w-full ">
            <Form {...form}>
                <form className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} required />
                                </FormControl>
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Libellé du champ</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} required />
                                </FormControl>
                            </FormItem>

                        )}
                    />

                    <FormField
                        control={form.control}
                        name="selected"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Valeur par défaut
                                    </FormLabel>
                                    <FormDescription>
                                        Valeur par défaut
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
                </form>

            </Form>
        </div>


    )
}