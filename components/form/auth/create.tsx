"use client"
import React from "react"
import * as z from "zod"
import { createUser } from "@/src/features/actions/auth/register.action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
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

export default function RegisterForm() {

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        try {
            await createUser(data)
        } catch (e) {
            console.error(e)
            toast.error('Oups une erreur est survenue')
        }
    }
    return (
        <div className="flex w-full flex-col items-center">
            < Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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