"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { UserEditSchema } from "@/src/helpers/definition";
import { ButtonLoading } from "@/components/ui/button-loader";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { editUser } from "@/src/features/actions/user/user.actions"
import { toast } from "sonner"
export default function EditUser({ user }: { user: { email: string, firstname: string, lastname: string, civility: 'M' | 'Mme' } }) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof UserEditSchema>>({
        resolver: zodResolver(UserEditSchema),
        defaultValues: {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            civility: user.civility,
        },
    })
    const onSubmit = async (data: z.infer<typeof UserEditSchema>) => {
        try {
            setLoading(true)
            const action = await editUser(data)
            if (action?.serverError) {
                setLoading(true)
                toast(`${action.serverError}`, {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                })
            } else {
                toast('Mise à jour du profil avec succès', {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                })
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error(err)
        }
    }
    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="DUPONT" readOnly disabled {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="civility"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Votre role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Civilité" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="M">Monsieur</SelectItem>
                                    <SelectItem value="Mme">Madame</SelectItem>
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
                                <Input type="text" placeholder="DUPONT" {...field} />
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
                                <Input type="text" placeholder="Henry" {...field} />
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