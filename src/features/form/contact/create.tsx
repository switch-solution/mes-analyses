"use client";
import React from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactSchema } from "@/src/helpers/definition";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createContact } from "@/src/features/actions/contact/contact.actions"
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
import { Input } from '@/components/ui/input'

export default function CreateFormContact({ clientId }: { clientId: string }) {

    const form = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            civility: "",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            clientId: clientId,
        },
    })
    const onSubmit = async (values: z.infer<typeof ContactSchema>) => {
        try {
            await ContactSchema.parseAsync(values)
            await createContact(values)
        } catch (err) {
            console.error(err)
        }
        try {
            //await createComponent(values)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form} >
                <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
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
                        name="civility"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Civilité</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner une civilité" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Mme">Madame</SelectItem>
                                        <SelectItem value="M">Monsieur</SelectItem>
                                    </SelectContent>
                                </Select>

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
                                    <Input placeholder="DUPONT" {...field} required />
                                </FormControl>
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
                                    <Input placeholder="Henry" {...field} required />
                                </FormControl>

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
                                    <Input type="email" placeholder="dupont.henry@email.fr" {...field} required />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Téléphone</FormLabel>
                                <FormControl>
                                    <Input type="tel" pattern="[0-9]{10}" placeholder="0101010101" {...field} />
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