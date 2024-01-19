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
import { Input } from "@/components/ui/input"
const formSchema = z.object({
    email: z.string().email({
        message: "L'email doit être valide.",
    }),
    firstname: z.string().min(2, {
        message: "Le prénom doit contenir au moins 2 caractères.",
    }),
    lastname: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères",
    }),
    password: z.string().min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères.",
    })
})

export default function RegisterForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            confirmPassword: ""
        },
    })
    return (
        <div className="flex flex-col w-full items-center">
            < Form {...form}>
                <form action={createUser} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Votre nom" {...field} />
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
                                    <Input placeholder="Henry" {...field} />
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
                                    <Input type="email" placeholder="test@test.fr" {...field} />
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
                                    <Input type='password' autoComplete="on" placeholder="mot de passe" {...field} />
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
                                    <Input type='password' autoComplete="on" placeholder="mot de passe" {...field} />
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