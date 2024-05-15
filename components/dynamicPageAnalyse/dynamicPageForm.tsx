"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { AddDynamicFormFields } from "@/src/helpers/definition"
import { createPageData } from "@/src/features/actions/pageData/page.data.actions";
import { useDebouncedCallback } from 'use-debounce';
import { generateUUID } from "@/src/helpers/generateUuid";
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
import { deleteForm } from "@/src/features/actions/pageData/page.data.actions";
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function DynamicPageForm({ clientSlug,
    projectSlug,
    pageSlug,
    blockSlug,
    projectPageSlug,
    fields,
    formId,
    datas,
    formGroup,
    formTitle,
    options
}: {
    clientSlug: string,
    projectSlug: string,
    pageSlug: string,
    blockSlug: string,
    formId: string,
    projectPageSlug: string,
    fields: {
        id: string,
        min: number,
        max: number,
        minLenght: number,
        maxLenght: number,
        label: string,
        type: string,
        required: boolean,
        htmlElement: string,
        blockMasterId: string | null
    }[],
    datas?: {
        id: string;
        label: string;
        projectLabel: string;
        softwareLabel: string;
        clientId: string;
        blockId: string;
        formId: string;
        pageVersion: number;
        value: string;
        formGroup: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
    }[],
    formGroup?: string,
    formTitle: string,
    options?: {
        id: string,
        label: string,
        options: string[],
        blockId: string | null | undefined,
        blockMasterId: string

    }[]
}

) {
    console.log(options)
    if (!formGroup) {
        formGroup = generateUUID()
    }
    const formSchema = AddDynamicFormFields(fields.map(field => field.label));
    const defaultsValues = {
        clientSlug: clientSlug,
        projectSlug: projectSlug,
        pageSlug: pageSlug,
        blockSlug: blockSlug,
        formId: formId,
        projectPageSlug: projectPageSlug,
        formGroup: formGroup,
    }
    if (datas) {
        const labels = datas.map(data => data.label)
        for (const label of labels) {
            const find = datas.find(data => data.label === label)
            if (find) {
                defaultsValues[label as keyof typeof defaultsValues] = find?.value
            }
        }
    } else {
        for (const field of fields) {
            defaultsValues[field.label as keyof typeof defaultsValues] = ""
        }
    }


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultsValues
    })

    const onChange = useDebouncedCallback(async (data: z.infer<typeof formSchema>) => {
        await createPageData(data)
        toast.success(`Mise à jour`, {
            description: new Date().toLocaleDateString(),
            action: {
                label: "fermer",
                onClick: () => console.log("fermeture"),
            },
        })

    }, 500)
    return (

        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row items-center justify-between">{formTitle}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline"> <Trash /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Veuillez confirmer la suppression.</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Cette action va supprimer l&apos;enregistement de ce formulaire.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={async () => {
                                    const action = await deleteForm({
                                        clientSlug,
                                        blockSlug,
                                        projectSlug,
                                        pageSlug,
                                        formId,
                                        formGroup,
                                        projectPageSlug
                                    })
                                    if (action?.serverError) {
                                        toast.error(`${action.serverError}`, {
                                            description: new Date().toLocaleDateString(),
                                            action: {
                                                label: "fermer",
                                                onClick: () => console.log("fermeture"),
                                            },
                                        })
                                    } else {
                                        toast.success(`Suppression du formulaire`, {
                                            description: new Date().toLocaleDateString(),
                                            action: {
                                                label: "fermer",
                                                onClick: () => console.log("fermeture"),
                                            },
                                        })
                                    }

                                }}>Confirmer </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog></CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onChange={form.handleSubmit(onChange)} className="space-y-8">
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
                            name="projectPageSlug"
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
                            name="pageSlug"
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
                            name="blockSlug"
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
                            name="formId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" placeholder="shadcn" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {
                            fields.map((input) => (
                                input.htmlElement === "input" ?
                                    < FormField
                                        key={input.label}
                                        control={form.control}
                                        name={input.label as "clientSlug" | "projectSlug" | "pageSlug" | "blockSlug" | "formId" | "formGroup"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{input.label}</FormLabel>
                                                <FormControl>
                                                    <Input type={input.type} max={input.max} min={input.min} minLength={input.minLenght} maxLength={input.maxLenght} required={input.required} placeholder={''} {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    :
                                    input.htmlElement === "select" &&
                                    <FormField
                                        key={input.label}
                                        control={form.control}
                                        name={input.label as "clientSlug" | "projectSlug" | "pageSlug" | "blockSlug" | "formId" | "formGroup"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{input.label}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {options?.filter(option => option.blockMasterId === input.blockMasterId && option.id === input.id).map(option =>
                                                            option.options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                            ))}
                    </form>
                </Form>
            </CardContent>
        </Card>




    )

}


