"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { SocietyEditSchema, EstablishmentEditSchema, OpsEditSchema, BankEditSchema } from "@/src/helpers/definition";
import { ButtonLoading } from "@/components/ui/button-loader";
import { updateSociety } from "@/src/features/actions/project_data/project_society.actions";
import { updateEstablishement } from "@/src/features/actions/project_data/project_establishment.actions";
import { updateUrssaf } from "@/src/features/actions/project_data/project_urssaf.actions";
import { toast } from "sonner"
import DynamicField from "@/components/ui/dynamic-field"
import type { TypeDynamicInput } from "@/src/helpers/type"
import { Form } from "@/components/ui/form"
import type { getSelectOptions } from "@/src/query/form.query";
import { updateBank } from "@/src/features/actions/project_data/project_bank.actions";
export default function EditDynamicForm({ clientSlug, projectSlug, processusSlug, inputs, options, datas, disabled = false }: {
    clientSlug: string, projectSlug: string, processusSlug: string, inputs: TypeDynamicInput, options: getSelectOptions, datas: {}, disabled?: boolean
}) {
    const [loading, setLoading] = useState(false)
    type FormInputs = z.infer<typeof SocietyEditSchema>

    let formSchema = null
    switch (processusSlug) {
        case "Standard_Processus_Society":
            formSchema = SocietyEditSchema
            break;
        case "Standard_Processus_Establishment":
            formSchema = EstablishmentEditSchema
            break;
        case "Standard_Processus_URSSAF":
            formSchema = OpsEditSchema
            break
        case "Standard_Processus_RateAt":
            formSchema = OpsEditSchema
            break
        case "Standard_Processus_Bank":
            formSchema = BankEditSchema
            break
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
            ...datas

        },
    })
    const onSubmit = async (data: unknown) => {
        try {
            setLoading(true)
            let action: unknown
            switch (processusSlug) {
                case "Standard_Processus_Society":
                    action = await updateSociety(data as z.infer<typeof SocietyEditSchema>)
                    break;
                case "Standard_Processus_Establishment":
                    action = await updateEstablishement(data as z.infer<typeof EstablishmentEditSchema>)
                    break;
                case "Standard_Processus_URSSAF":
                    action = await updateUrssaf(data as z.infer<typeof OpsEditSchema>)
                    break
                case "Standard_Processus_Bank":
                    action = await updateBank(data as z.infer<typeof BankEditSchema>)
                    break
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
                <DynamicField inputs={inputs} form={form} options={options} disabled={disabled} />
                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
            </form>
        </Form >
    )

}