"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { AddDynamicFormFields } from "@/src/helpers/definition"
import { Pencil, Calendar, Trash } from "lucide-react";
import { editValue, deleteValue } from "@/src/features/actions/form/form.actions";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function DynamicForms(
    {
        clientSlug,
        softwareSlug,
        formGroup,
        projectSlug,
        formSlug,
        pageSlug,
        formProps,
        datas,
        fields,
        settingSlug
    }: {
        clientSlug: string,
        softwareSlug: string,
        formSlug: string,
        pageSlug: string | null
        formGroup: {
            formId: string,
            formVersion: number,
            formGroup: string,
            mode: string
        }[] | null
        projectSlug: string | null,
        formProps: {
            label: string,
            buttonLabel: string,
        },
        fields: {
            label: string,
            type: string,
            placeholder: string | null,
            htmlElement: string,
            max: number,
            min: number,
            minLength: number,
            maxLength: number,
            required: boolean,
            id: string,
        }[],
        settingSlug?: string | null,
        datas: { formGroup: string, [key: string]: string }[]
    }

) {

    return (
        <div>
            {formGroup && formGroup.map(form => <div key={form.formGroup} className="mt-2">
                <DynamicForm
                    clientSlug={clientSlug}
                    formSlug={formSlug}
                    softwareSlug={softwareSlug}
                    projectSlug={projectSlug}
                    pageSlug={pageSlug}
                    settingSlug={settingSlug}
                    fields={fields}
                    formProps={formProps}
                    formGroup={form.formGroup}
                    datas={datas.filter(data => data.formGroup === form.formGroup)}
                />
            </div>
            )}

        </div>
    )

}

const DynamicForm = (
    {
        clientSlug,
        softwareSlug,
        projectSlug,
        formGroup,
        pageSlug,
        formSlug,
        formProps,
        datas,
        fields,
        settingSlug
    }: {
        clientSlug: string,
        softwareSlug: string,
        formGroup: string,
        pageSlug: string | null
        projectSlug: string | null,
        formSlug: string,
        formProps: {
            label: string,
            buttonLabel: string,
        },
        fields: {
            label: string,
            type: string,
            placeholder: string | null,
            htmlElement: string,
            max: number,
            min: number,
            minLength: number,
            maxLength: number,
            required: boolean,
            id: string,
        }[],
        settingSlug?: string | null,
        datas: { [key: string]: string }[]
    }
) => {
    const [edit, setEdit] = useState(false)
    const formSchema = AddDynamicFormFields(fields.map(field => field.label));
    const defaultsValues = {
        clientSlug: clientSlug,
        projectSlug: projectSlug ? projectSlug : undefined,
        pageSlug: pageSlug ? pageSlug : undefined,
        settingSlug: settingSlug ? settingSlug : undefined,
        softwareSlug: softwareSlug,
        formGroup: formGroup,
        formSlug: formSlug
    }
    if (datas) {
        for (const field of fields) {
            defaultsValues[field.label as keyof typeof defaultsValues] = datas.find(data => data[field.label] !== undefined) ? datas.find(data => data[field.label] !== undefined)![field.label] : ""
        }
    } else {
        for (const field of fields) {
            defaultsValues[field.label as keyof typeof defaultsValues] = "";
        }
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultsValues
    })


    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        await editValue(data)
        toast.success(`Mise à jour`, {
            description: new Date().toLocaleDateString(),
            action: {
                label: "fermer",
                onClick: () => console.log("fermeture"),
            },
        })
        setEdit(() => false)

    }
    return (
        <Card className="m-2">
            <CardHeader>
                <CardTitle className="flex flex-row items-center justify-between">
                    {formProps.label}
                </CardTitle>
                <CardDescription>
                    <span className="flex flex-row justify-start">
                        <Pencil onClick={() => setEdit(edit ? false : true)} className="mr-2 hover:cursor-pointer" aria-label="editer" />
                        <Calendar className="mr-2 hover:cursor-pointer" aria-label="historique" />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Trash className="mr-2 hover:cursor-pointer" aria-label="supprimer" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmer la supression.</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cette action est irréversible vous ne pourrez pas récupérer les données supprimées.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction onClick={async () => {
                                        const action = await deleteValue({
                                            clientSlug: clientSlug,
                                            softwareSlug: softwareSlug,
                                            formGroup: formGroup,
                                            settingSlug: settingSlug ? settingSlug : undefined,
                                            formSlug: formSlug,
                                            projectSlug: projectSlug ? projectSlug : undefined,
                                            pageSlug: pageSlug ? pageSlug : undefined,
                                            mode: projectSlug ? 'Project' : 'Editeur'
                                        })
                                        if (action.serverError) {
                                            toast.error(`Suppression`, {
                                                description: new Date().toLocaleDateString(),
                                                action: {
                                                    label: "fermer",
                                                    onClick: () => console.log("fermeture"),
                                                },
                                            })
                                        } else {
                                            toast.success(`Suppression de l'élément`, {
                                                description: new Date().toLocaleDateString(),
                                                action: {
                                                    label: "fermer",
                                                    onClick: () => console.log("fermeture"),
                                                },
                                            })
                                        }
                                    }}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </span>
                    <span className="flex justify-end">{edit ? <span>Mode édition</span> : <span>Lecture seul</span>}</span>
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
                                        <Input type="hidden" placeholder="shadcn" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="formGroup"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" placeholder="shadcn" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="settingSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" placeholder="shadcn" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="softwareSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" placeholder="shadcn" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="projectSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" placeholder="shadcn" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="formSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" placeholder="shadcn" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {pageSlug &&
                            <FormField
                                control={form.control}
                                name="pageSlug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="hidden" placeholder="shadcn" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        }

                        {
                            fields.map((input) => (
                                input.htmlElement === "input" ?
                                    <FormField
                                        key={input.label}
                                        control={form.control}
                                        name={input.label as "clientSlug" | "softwareSlug" | "formGroup" | "formSlug" | "projectSlug" | "pageSlug"} // Update the type of the name prop
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{input.label}</FormLabel>
                                                <FormControl>
                                                    <Input type={input.type} max={input.max} min={input.min} minLength={input.minLength} maxLength={input.maxLength} required={input.required} readOnly={edit ? false : true} placeholder={''}  {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    : undefined


                            ))}
                        {edit && <Button type='submit'>{formProps.buttonLabel}</Button>}
                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}


