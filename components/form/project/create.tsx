"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createProjet } from "@/src/features/actions/project/project.action"
import { ProjectCreateSchema } from "@/src/helpers/definition";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getMySoftware } from "@/src/query/user.query"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CreateProject({ clientSlug, softwares }: { clientSlug: string, softwares: getMySoftware }) {
    const form = useForm<z.infer<typeof ProjectCreateSchema>>({
        resolver: zodResolver(ProjectCreateSchema),
        defaultValues: {
            clientSlug: clientSlug,
            label: "",
            description: "",
            softwareLabel: softwares.at(0)?.softwareLabel
        },
    })

    const onSubmit = async (values: z.infer<typeof ProjectCreateSchema>) => {
        try {
            await createProjet(values)

        } catch (err) {
            console.error(err)

        }
    }
    return (
        <div className="flex flex-col w-full items-center">
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
                        name="softwareLabel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Choisir votre logiciel</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choisir votre logiciel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {softwares.map((software) => (
                                            <SelectItem key={software.softwareLabel} value={software.softwareLabel}>{software.softwareLabel}</SelectItem>))}
                                    </SelectContent>
                                </Select>
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
                    <Button type="submit">Envoyer</Button>

                </form>
            </Form>
        </div>

    )
}