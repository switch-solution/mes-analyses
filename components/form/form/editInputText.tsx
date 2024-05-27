"use client";
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldEditSchema } from "@/src/helpers/definition";
import { editField } from "@/src/features/actions/field/field.actions";
export default function EditInputText({
    formSlug,
    clientSlug,
    softwareSlug,
    fieldSlug,
    dsn,
    field
}:
    {
        formSlug: string,
        clientSlug: string,
        fieldSlug: string,
        softwareSlug: string
        dsn: {
            id: string;
            label: string;
            type: string;
        }[],
        field: {
            label: string,
            minLength: number,
            maxLength: number,
            required: boolean,
            readonly: boolean,
            sourceDsnId?: string | null
        }
    }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof FieldEditSchema>>({
        resolver: zodResolver(FieldEditSchema),
        defaultValues: {
            formSlug,
            clientSlug,
            softwareSlug,
            fieldSlug,
            min: 1,
            max: 99999,
            label: field.label,
            minLength: field.minLength,
            maxLength: field.maxLength,
            required: field.required,
            readonly: field.readonly,
            sourceDsnId: field.sourceDsnId ? field.sourceDsnId : ''


        }
    })
    const onSubmit = async (data: z.infer<typeof FieldEditSchema>) => {
        try {
            setLoading(true)
            const action = await editField(data)
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
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="clientSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="softwareSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="formSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fieldSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' {...field} />
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
                                <FormLabel>Libellé du champ</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Saisir le libellé de votre champ.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="minLength"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre minimum de caractères</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="1" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Préciser la valeur minimum à saisir par default 1.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maxLength"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre maximum de caractères</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="255" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Préciser la valeur maximum à saisir par default 255.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="required"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Champ requis</FormLabel>
                                    <FormDescription>
                                        Le champ est obligatoire.
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
                        name="sourceDsnId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Structure DSN</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="DSN" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {dsn.map((item) => (
                                            <SelectItem key={item.id} value={item.id}>
                                                {item.id}-{item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type="submit">Mettre à jour</Button>
                </form>
            </Form>

        </>
    )


}




