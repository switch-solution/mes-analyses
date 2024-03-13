"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from 'react';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SetupSoftwareSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createSetupSoftware } from "@/src/features/actions/setup/setup.actions"
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
export default function CreateSoftware() {
    const form = useForm<z.infer<typeof SetupSoftwareSchema>>({
        resolver: zodResolver(SetupSoftwareSchema),
        defaultValues: {
            label: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof SetupSoftwareSchema>) => {
        try {
            await createSetupSoftware(data)
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <div className="flex w-full flex-col items-center">
            <Suspense fallback={<Skeleton />}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
