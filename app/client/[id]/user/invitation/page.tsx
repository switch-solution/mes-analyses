"use client";
import React from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { formSchema } from "@/src/helpers/definition"
import { createInvitation } from "./invitation.action";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function FormInvitation({ params }: { params: { id: string } }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientId: params.id,
            email: "",
            firstname: "",
            lastname: "",

        },
    })
    return (
        <div className="flex flex-col w-full items-center">
            < Form {...form}>
                <form action={createInvitation} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="clientId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Client Id</FormLabel>
                                <FormControl>
                                    <Input readOnly {...field} />
                                </FormControl>
                                <FormDescription>
                                    Votre nom
                                </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Votre nom" required {...field} />
                                </FormControl>
                                <FormDescription>
                                    Votre nom
                                </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Henry" required {...field} />
                                </FormControl>
                                <FormDescription>
                                    Votre prénom
                                </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" required placeholder="test@test.fr" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Votre email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}

                    />

                    <Button type="submit">Inviter</Button>
                </form>
            </Form >

        </div>
    )
}