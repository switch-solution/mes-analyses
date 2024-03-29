"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { SocietyEditSchema, EstablishmentEditSchema } from "@/src/helpers/definition";
import { ButtonLoading } from "@/components/ui/button-loader";
import { updateSociety, updateEstablishement } from "@/src/features/actions/project_data/project_standard.actions";
import { toast } from "sonner"
import DynamicField from "@/components/ui/dynamic-field"
import type { TypeDynamicInput } from "@/src/helpers/type"
import {
    Form,
} from "@/components/ui/form"
import type { getSelectOptions } from "@/src/query/form.query";
export default function EditDynamicForm({ clientSlug, projectSlug, processusSlug, table, inputs, options, datas }: {
    clientSlug: string, projectSlug: string, processusSlug: string, table: string, inputs: TypeDynamicInput, options: getSelectOptions, datas: {}
}) {
    const [loading, setLoading] = useState(false)
    type FormInputs = z.infer<typeof SocietyEditSchema>


    let formSchema = null

    switch (table) {
        case "Project_Society":
            formSchema = SocietyEditSchema
            break;
        case "Project_Establisment":
            formSchema = EstablishmentEditSchema
            break;
        default: {
            throw new Error("La table n'existe pas")
        }
    }
    const form = useForm<FormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientSlug: clientSlug,
            processusSlug: processusSlug,
            projectSlug: projectSlug,
            table: table as 'Project_Society',
            ...datas

        },
    })
    const onSubmit = async (data: unknown) => {
        try {
            setLoading(true)
            let action: unknown
            switch (table) {
                case "Project_Society":
                    action = await updateSociety(data as z.infer<typeof SocietyEditSchema>)
                    break;
                case "Project_Establisment":
                    action = await updateEstablishement(data as z.infer<typeof EstablishmentEditSchema>)
                    break;
                default: {
                    throw new Error("La table n'existe pas")
                }
            }
            if ((action as { serverError?: string })?.serverError) {
                setLoading(false)
                const serverError = (action as { serverError?: string }).serverError;
                toast(`${serverError}`, {
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
        < Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <DynamicField inputs={inputs} form={form} options={options} />
                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
            </form>
        </Form >
    )

}