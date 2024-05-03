"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { AddDynamicFormFields } from "@/src/helpers/definition"
import { ContainerForm } from "@/components/layout/container";
import { createPageData } from "@/src/features/actions/page/page.actions";
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
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function DynamicPageForm({ clientSlug,
    projectSlug,
    pageSlug,
    blockSlug,
    fields,
    formId,
    datas,
    formGroup,
    formTitle
}: {
    clientSlug: string,
    projectSlug: string,
    pageSlug: string,
    blockSlug: string,
    formId: string,
    fields: string[],
    datas?: {
        id: string;
        label: string;
        projectLabel: string;
        softwareLabel: string;
        clientId: string;
        blockId: string;
        formId: string;
        blockVersion: number;
        value: string;
        formGroup: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
    }[],
    formGroup?: string,
    formTitle: string

}) {
    if (!formGroup) {
        formGroup = generateUUID()
    }
    const formSchema = AddDynamicFormFields(fields);
    const defaultsValues = {
        clientSlug: clientSlug,
        projectSlug: projectSlug,
        pageSlug: pageSlug,
        blockSlug: blockSlug,
        formId: formId,
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
            defaultsValues[field as keyof typeof defaultsValues] = ""
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
        <ContainerForm title={formTitle}>
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
                    {datas &&
                        datas.map((data) => (
                            <FormField
                                key={data.id}
                                control={form.control}
                                name={data.label as "formId" | "formGroup" | "clientSlug" | "projectSlug" | "pageSlug" | "blockSlug"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{data.label}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={data.value}  {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />


                        ))}
                    {!datas &&
                        fields.map((input) => (
                            <FormField
                                key={input}
                                control={form.control}
                                name={input as "clientSlug" | "projectSlug" | "pageSlug" | "blockSlug" | "formId" | "formGroup"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{input}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={''} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />


                        ))}
                </form>
            </Form>
        </ContainerForm>

    )

}
