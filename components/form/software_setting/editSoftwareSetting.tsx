"use client";
import * as z from "zod"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { SettingEditSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { ButtonLoading } from "@/components/ui/button-loader";
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

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import type { getSoftwareSettingBySlug } from "@/src/query/software_setting.query"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { editSoftwareSetting } from "@/src/features/actions/software_setting/software_setting.actions"
import { Input } from '@/components/ui/input'
import { toast } from "sonner"

export default function EditSoftwareSetting({ clientSlug, softwareSlug, setting }: { clientSlug: string, softwareSlug: string, setting: getSoftwareSettingBySlug }) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof SettingEditSchema>>({
        resolver: zodResolver(SettingEditSchema),
        defaultValues: {
            clientSlug: clientSlug,
            slug: setting?.slug,
            label: setting?.label,
            id: setting?.id,
            value: setting?.value,
            description: setting?.description ?? '',
            softwareSlug: softwareSlug

        },
    })
    const onSubmit = async (data: z.infer<typeof SettingEditSchema>) => {
        try {
            setLoading(true)
            const action = await editSoftwareSetting(data)
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
                    name="slug"
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
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input type="text" disabled placeholder="" {...field} required />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="" {...field} required />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valeur</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} required />
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
                                <Input placeholder="La description de mon paramètre" {...field} />
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
