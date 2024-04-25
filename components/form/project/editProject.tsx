"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { updateProject } from "@/src/features/actions/project/project.action"
import { ProjectEditSchema } from "@/src/helpers/definition";
import { ButtonLoading } from "@/components/ui/button-loader";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation";
import { toast } from "sonner"
export default function EditProject({ clientSlug, projectSlug, project }: {
    clientSlug: string, projectSlug: string, project: {
        label: string,
        description: string,
        status: 'Actif' | 'Archivé' | 'En attente'

    }
}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof ProjectEditSchema>>({
        resolver: zodResolver(ProjectEditSchema),
        defaultValues: {
            projectSlug: projectSlug,
            clientSlug: clientSlug,
            label: project.label,
            description: project.description,
            status: project.status
        },
    })

    const onSubmit = async (data: z.infer<typeof ProjectEditSchema>) => {
        try {
            setLoading(true)
            const action = await updateProject(data)
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
        <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
                <CardTitle>Formulaire</CardTitle>
                <CardDescription>
                    Edition de votre projet
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                            name="projectSlug"
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
                                        <Input placeholder="Mon nouveau projet" readOnly disabled required {...field} />
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
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Actif">Actif</SelectItem>
                                            <SelectItem value="En attente">En attente</SelectItem>
                                            <SelectItem value="Archivé">Archivé</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

                    </form>
                </Form>
            </CardContent>
        </Card>


    )
}