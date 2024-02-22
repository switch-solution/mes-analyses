"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from 'react';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SoftwaresSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createSoftware } from '@/src/features/actions/software/software.actions'
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
export default function SoftwareForm({ clientSlug }: { clientSlug: string }) {
    const form = useForm<z.infer<typeof SoftwaresSchema>>({
        resolver: zodResolver(SoftwaresSchema),
        defaultValues: {
            clientSlug: clientSlug,
            label: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof SoftwaresSchema>) => {
        try {
            await createSoftware(data)
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <div className="flex flex-col w-full items-center">
            <Suspense fallback={<Skeleton />}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                            name="label"
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
                        <Button type="submit">Enregistrer</Button>

                    </form>

                </Form>
            </Suspense>

        </div>
    )
}
