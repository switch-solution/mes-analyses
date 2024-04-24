"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { SocietyEditSchema, EstablishmentEditSchema, OpsEditSchema, BankEditSchema, ProjectTableEditSchema, IdccEditSchema, ClassificationEditSchema, PaidLeaveEditSchema, ProjectAbsenceEditSchema, ServiceEditSchema } from "@/src/helpers/definition";
import { ButtonLoading } from "@/components/ui/button-loader";
import { updateSociety } from "@/src/features/actions/project_data/project_society.actions";
import { updateEstablishement } from "@/src/features/actions/project_data/project_establishment.actions";
import { updateUrssaf } from "@/src/features/actions/project_data/project_urssaf.actions";
import { toast } from "sonner"
import DynamicField from "@/components/ui/dynamic-field"
import type { TypeDynamicInput } from "@/src/helpers/type"
import { Form } from "@/components/ui/form"
import { updateCoefficient } from "@/src/features/actions/project_data/project_coefficient.actions";
import { updateEchelon } from "@/src/features/actions/project_data/project_echelon.actions";
import { updateIndice } from "@/src/features/actions/project_data/project_indice.actions";
import { updateQualification } from "@/src/features/actions/project_data/project_qualification.actions";
import { updateIdcc } from "@/src/features/actions/project_data/project_idcc.actions";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { getSelectOptions } from "@/src/query/form.query";
import { updateNiveau } from "@/src/features/actions/project_data/project_niveau.actions";
import { updateBank } from "@/src/features/actions/project_data/project_bank.actions";
import { updatePaidLeave } from "@/src/features/actions/project_data/project_paidLeave.actions";
import { updateAbsence } from "@/src/features/actions/project_data/project_absence.actions";
import { updateService } from "@/src/features/actions/project_data/project_service.actions";
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
        case "Standard_Processus_Table_Seniority":
            formSchema = ProjectTableEditSchema
            break
        case "Standard_Processus_ccn":
            formSchema = IdccEditSchema
            break
        case "Standard_Processus_niveau":
            formSchema = ClassificationEditSchema
            break
        case "Standard_Processus_coefficient":
            formSchema = ClassificationEditSchema
            break
        case "Standard_Processus_indice":
            formSchema = ClassificationEditSchema
            break
        case "Standard_Processus_qualification":
            formSchema = ClassificationEditSchema
            break
        case "Standard_Processus_echelon":
            formSchema = ClassificationEditSchema
            break
        case "Standard_Processus_CP":
            formSchema = PaidLeaveEditSchema
            break
        case "Standard_Processus_Absences":
            formSchema = ProjectAbsenceEditSchema
            break
        case "Standard_Processus_services":
            formSchema = ServiceEditSchema
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
                case "Standard_Processus_ccn":
                    action = await updateIdcc(data as z.infer<typeof IdccEditSchema>)
                    break
                case "Standard_Processus_niveau":
                    action = await updateNiveau(data as z.infer<typeof ClassificationEditSchema>)
                    break
                case "Standard_Processus_coefficient":
                    action = await updateCoefficient(data as z.infer<typeof ClassificationEditSchema>)
                    break
                case "Standard_Processus_indice":
                    action = await updateIndice(data as z.infer<typeof ClassificationEditSchema>)
                    break
                case "Standard_Processus_qualification":
                    action = await updateQualification(data as z.infer<typeof ClassificationEditSchema>)
                    break
                case "Standard_Processus_niveau":
                    action = await updateNiveau(data as z.infer<typeof ClassificationEditSchema>)
                    break
                case "Standard_Processus_echelon":
                    action = await updateEchelon(data as z.infer<typeof ClassificationEditSchema>)
                    break
                case "Standard_Processus_CP":
                    action = await updatePaidLeave(data as z.infer<typeof PaidLeaveEditSchema>)
                    break
                case "Standard_Processus_Absences":
                    action = await updateAbsence(data as z.infer<typeof ProjectAbsenceEditSchema>)
                    break
                case "Standard_Processus_services":
                    action = await updateService(data as z.infer<typeof ServiceEditSchema>)
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
        <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
                <CardTitle>Formulaire</CardTitle>
                <CardDescription>
                    Table ancienneté code
                </CardDescription>
            </CardHeader>
            <CardContent>

                < Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <DynamicField inputs={inputs} form={form} options={options} disabled={disabled} />
                        {disabled ? undefined : loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
                    </form>
                </Form >
            </CardContent>
        </Card>

    )

}