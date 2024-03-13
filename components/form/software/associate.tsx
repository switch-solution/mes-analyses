"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AssociateSoftwareSchema } from "@/src/helpers/definition";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { associateSoftwareUser } from "@/src/features/actions/software/software.actions"
import type { getUsersClientList } from "@/src/query/client.query"
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
import { Switch } from "@/components/ui/switch"

import { Input } from '@/components/ui/input'

export default function AssociateSoftwareForm({ clientSlug, softwareSlug, users }: { clientSlug: string, softwareSlug: string, users: getUsersClientList }) {
    const form = useForm<z.infer<typeof AssociateSoftwareSchema>>({
        resolver: zodResolver(AssociateSoftwareSchema),
        defaultValues: {
            clientSlug: clientSlug,
            softwareSlug: softwareSlug,
            email: "",
            isEditor: false
        },
    })
    const onSubmit = async (data: z.infer<typeof AssociateSoftwareSchema>) => {
        try {
            await associateSoftwareUser(data)
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <div className="flex w-full flex-col items-center">
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Utilisateurs</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Ajouter un utilisateur" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent >

                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isEditor"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Editeur
                                    </FormLabel>
                                    <FormDescription>
                                        L&rsquo;utilisateur pourra éditer le logiciel
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