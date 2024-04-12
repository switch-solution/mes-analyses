"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createInvitation } from "@/src/features/actions/invitation/invitation.actions"
import { InvitationCreateSchema } from "@/src/helpers/definition";
import { ButtonLoading } from "@/components/ui/button-loader";
import { Switch } from "@/components/ui/switch"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
type Software = {
    label: string
    value: string

}
export default function CreateInvitation({ clientSlug, softwares }: { clientSlug: string, softwares: Software[] }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof InvitationCreateSchema>>({
        resolver: zodResolver(InvitationCreateSchema),
        defaultValues: {
            clientSlug: clientSlug,
            softwareLabel: "",
            email: "",
            civility: "Mme",
            lastname: "",
            firstname: "",
            defaultRole: "Consultant déploiement",
            isAdministrator: false,
            isEditor: false,
            isBillable: true,

        },
    })

    const onSubmit = async (data: z.infer<typeof InvitationCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createInvitation(data)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="clientSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" required {...field} />
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
                                <Input type='email' required {...field} />
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
                            <FormLabel>Civilité</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Madame" />
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
                                <Input type='text' required {...field} />
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
                                <Input type='text' required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="softwareLabel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logiciel</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Logiciel" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {softwares.map((software) => {
                                        return (
                                            <SelectItem key={software.value} value={software.value}>{software.label}</SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="defaultRole"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Madame" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Consultant déploiement">Consultant déploiement</SelectItem>
                                    <SelectItem value="Directeur de projet">Directeur de projet</SelectItem>
                                    <SelectItem value="Chef de projet">Chef de projet</SelectItem>
                                    <SelectItem value="Consultant technique">Consultant technique</SelectItem>
                                    <SelectItem value="Support">Support</SelectItem>
                                    <SelectItem value="Responsable paie">Responsable paie</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isAdministrator"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Administrateur</FormLabel>
                                <FormDescription>
                                    L&apos;utilisateur sera administrateur client et pourra gérer les utilisateurs.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-readonly
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isEditor"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Editeur</FormLabel>
                                <FormDescription>
                                    L&apos;utilisateur sera editeur ce qui lui permettra de modifier les données logiciels.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-readonly
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isBillable"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Facturable</FormLabel>
                                <FormDescription>
                                    L&apos;utilisateur est facturable. Pour rappel les utilisateurs factuables sont les collaborateurs et les sous traitants de l&apos;éditeur.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-readonly
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

            </form>
        </Form>

    )
}