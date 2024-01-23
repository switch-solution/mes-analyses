"use client"
import React from "react"
import * as z from "zod"
import { createUser } from "./register.action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RegisterSchema } from "@/src/helpers/definition"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function RegisterForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            civility: "",
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            confirmPassword: ""
        },
    })
    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        try {
            await createUser(data)
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <div className="flex flex-col w-full items-center">
            < Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="civility"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Civilité</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Indiquer votre civilité" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="M">Monsieur</SelectItem>
                                        <SelectItem value="Mme">Madame</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Selectionner votre civilité{" "}
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
                                    <Input placeholder="Votre nom" {...field} required />
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
                                    <Input placeholder="Henry" {...field} required />
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
                                    <Input type="email" placeholder="test@test.fr" {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Votre email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mot de passe</FormLabel>
                                <FormControl>
                                    <Input type='password' autoComplete="on" placeholder="mot de passe" {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Le mot de passe doit faire au moins 8 caractères.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmer le mot de passe</FormLabel>
                                <FormControl>
                                    <Input type='password' autoComplete="on" placeholder="mot de passe" {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Resaisir le mot de passe
                                </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <Button type="submit">Envoyer</Button>
                </form>
            </Form >

        </div>
    )
}