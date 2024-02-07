'use client';
import React from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createClient } from "@/src/features/actions/client/client.action";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ClientFormSchema } from "@/src/helpers/definition";

export default function CreateClient() {

    const form = useForm<z.infer<typeof ClientFormSchema>>({
        resolver: zodResolver(ClientFormSchema),
        defaultValues: {
            socialReason: "",
            siret: "",
            ape: "",
            address1: "",
            address2: "",
            address3: "",
            address4: "",
            city: "",
            codeZip: "",
            country: "",
        },
    })

    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form action={createClient} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="socialReason"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Raison social</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Ma société" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="siret"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>SIRET</FormLabel>
                                <FormControl>
                                    <Input minLength={14} maxLength={14} placeholder="123456789" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="ape"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>APE</FormLabel>
                                <FormControl>
                                    <Input minLength={5} maxLength={5} placeholder="Code APE" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />

                    <FormField
                        control={form.control}
                        name="address1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse 1</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="address2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse 2</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="address3"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse 3</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="address4"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Complément d&apos;adresse</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ville</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name="codeZip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code postal</FormLabel>
                                <FormControl>
                                    <Input minLength={5} maxLength={5} placeholder="Rue de la victoire" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pays</FormLabel>
                                <FormControl>
                                    <Input maxLength={50} placeholder="Rue de la victoire" {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}

                    />
                    <Button type="submit">Envoyer</Button>
                </form>
            </Form>
        </div>

    )

}