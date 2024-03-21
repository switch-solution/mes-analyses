"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { InvitationInternalProjectSchema } from "@/src/helpers/definition"
import { createInternalInvitationProject } from "@/src/features/actions/projet_invitation/projet_invitation.action";
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
import { toast } from "sonner"
import type { getSoftwareUsers } from "@/src/query/software.query"
import { Input } from "@/components/ui/input"
export default function InvitationInternalProjectForm({ clientSlug, projectSlug, users }: { clientSlug: string, projectSlug?: string, users: getSoftwareUsers }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof InvitationInternalProjectSchema>>({
        resolver: zodResolver(InvitationInternalProjectSchema),
        defaultValues: {
            clientSlug: clientSlug,
            projectSlug: projectSlug,
            userInternalId: "",
            isAdministratorProject: false,
            isEditorProject: false,

        },
    })
    const onSubmit = async (data: z.infer<typeof InvitationInternalProjectSchema>) => {
        try {
            setLoading(true)
            const action = await createInternalInvitationProject(data)
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
            console.error(err)
        }

    }
    return (
        < Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name="clientSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" readOnly {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />

                <FormField
                    control={form.control}
                    name="projectSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" readOnly {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="userInternalId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Civilité</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Séléctionner un utilisateur" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {users.map((user) => (<SelectItem key={user.id} value={user.id}> {user.lastname} {user.firstname}</SelectItem>))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isAdministratorProject"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Administrateur projet
                                </FormLabel>
                                <FormDescription>
                                    L&apos;utilisateur sera administrateur.
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
                <FormField
                    control={form.control}
                    name="isEditorProject"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Editeur
                                </FormLabel>
                                <FormDescription>
                                    L&apos;utilisateur pourra éditer les cahiers d&aps;analyse.
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
                <FormField
                    control={form.control}
                    name="isValidatorProject"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Validateur
                                </FormLabel>
                                <FormDescription>
                                    L&apos;utilisateur pourra valider les cahiers d&aps;analyse.
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
                <Button type="submit">Inviter</Button>
            </form>
        </Form >

    )
}