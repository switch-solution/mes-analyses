"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createProjet } from "@/src/features/actions/project/project.action"
import { ProjectCreateSchema } from "@/src/helpers/definition";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner"
export default function CreateProject({ clientSlug }: { clientSlug: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof ProjectCreateSchema>>({
        resolver: zodResolver(ProjectCreateSchema),
        defaultValues: {
            clientSlug: clientSlug,
            label: "",
            description: "",
            role: "Consultant déploiement"
        },
    })

    const onSubmit = async (data: z.infer<typeof ProjectCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createProjet(data)
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

            setLoading(false)

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
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de votre projet</FormLabel>
                            <FormControl>
                                <Input placeholder="Mon nouveau projet" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description de votre projet</FormLabel>
                            <FormControl>
                                <Input placeholder="Mon nouveau projet" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Votre role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Votre role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Consultant déploiement">Consultant déploiement</SelectItem>
                                    <SelectItem value="Consultant fonctionnel">Consultant fonctionnel</SelectItem>
                                    <SelectItem value="Directeur de projet">Directeur de projet</SelectItem>
                                    <SelectItem value="Chef de projet">Chef de projet</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

            </form>
        </Form>

    )
}