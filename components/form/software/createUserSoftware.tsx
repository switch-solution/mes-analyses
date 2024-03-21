"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUserSoftwareSchema } from "@/src/helpers/definition";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ButtonLoading } from "@/components/ui/button-loader";
import { createUserSoftware } from "@/src/features/actions/software/software.actions"
import type { getUserInternalNotInSoftware } from "@/src/query/software.query"
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
import { toast } from "sonner"

export default function CreateUserSoftware({ clientSlug, softwareSlug, users }: { clientSlug: string, softwareSlug: string, users: getUserInternalNotInSoftware }) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof CreateUserSoftwareSchema>>({
        resolver: zodResolver(CreateUserSoftwareSchema),
        defaultValues: {
            clientSlug: clientSlug,
            softwareSlug: softwareSlug,
            userInternalId: "",
            isEditor: false
        },
    })
    const onSubmit = async (data: z.infer<typeof CreateUserSoftwareSchema>) => {
        try {
            const action = await createUserSoftware(data)
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
                        name="userInternalId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Utilisateur</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Séléctionner un utilisateur" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {users.map((user) => (<SelectItem key={user.userId} value={user.userId}>{user.lastname} {user.firstname}</SelectItem>))}
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
                    {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

                </form>
            </Form>
        </div>
    )
}