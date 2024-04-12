"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { SocietyCreateSchema, BankCreateSchema, SocietyFreeZoneCreateSchema, SalaryCreateSchema, ProjectAbsenceCreateSchema, EstablishmentBankCreateSchema, FreeZoneCreateSchema, EstablishmentCreateSchema, CreateServiceSchema, JobCreateSchema, CreatePaidLeaveSchema, RateAtCreateSchema, OpsCreateSchema, CreateIdccSchema, CreateClassificationSchema } from "@/src/helpers/definition";
import { createUrssaf } from "@/src/features/actions/project_data/project_urssaf.actions";
import { ButtonLoading } from "@/components/ui/button-loader";
import { createJob } from "@/src/features/actions/project_data/project_job.actions";
import { createSociety } from "@/src/features/actions/project_data/project_society.actions";
import { createService } from "@/src/features/actions/project_data/project_service.actions";
import { createEstablishement } from "@/src/features/actions/project_data/project_establishment.actions";
import { toast } from "sonner"
import { createIdcc } from "@/src/features/actions/project_data/project_idcc.actions"
import DynamicField from "@/components/ui/dynamic-field"
import { createMutual } from "@/src/features/actions/project_data/project_mutual.actions";
import { createPrevoyance } from "@/src/features/actions/project_data/project_prevoyance.actions";
import { createAgircArcco } from "@/src/features/actions/project_data/project_agirc_arrco.actions";
import type { TypeDynamicInput } from "@/src/helpers/type"
import { createPaidLeave } from "@/src/features/actions/project_data/project_paidLeave.actions";
import { createNiveau } from "@/src/features/actions/project_data/project_niveau.actions";
import { createCoefficient } from "@/src/features/actions/project_data/project_coefficient.actions";
import { createQualification } from "@/src/features/actions/project_data/project_qualification.actions";
import { createIndice } from "@/src/features/actions/project_data/project_indice.actions";
import { createEchelon } from "@/src/features/actions/project_data/project_echelon.actions";
import { createBank } from "@/src/features/actions/project_data/project_bank.actions";
import { createEstablishmentBank } from "@/src/features/actions/project_data/project_establishmentBank.actions"
import { createFreeZone } from "@/src/features/actions/project_data/project_freeZone.actions"
import { createSocietyFreeZone } from "@/src/features/actions/project_data/project_societyFreeZone.actions"
import { createAbsence } from "@/src/features/actions/project_data/project_absence.actions"
import { createSalary } from "@/src/features/actions/project_data/project_salary.actions"
import {
    Form,
} from "@/components/ui/form"
import type { getSelectOptions } from "@/src/query/form.query";
import { createRateAt } from "@/src/features/actions/project_data/project_rateAt.actions";
export default function CreateDynamicForm({ clientSlug, projectSlug, processusSlug, inputs, options }: {
    clientSlug: string, projectSlug: string, processusSlug: string, inputs: TypeDynamicInput, options: getSelectOptions
}) {
    const [loading, setLoading] = useState(false)
    type FormInputs = z.infer<typeof SocietyCreateSchema>
    const inputskeyArray = inputs.map((input) => {
        return {
            id: input.zodLabel,
            value: "",
        }
    })
    const array = inputskeyArray;
    const inputsObject = array.reduce((acc, { id, value }) => {
        acc[id] = value;
        return acc;
    }, {} as { [key: string]: string });

    let formSchema = null

    switch (processusSlug) {
        case "Standard_Processus_Society":
            formSchema = SocietyCreateSchema
            break;
        case "Standard_Processus_Establishment":
            formSchema = EstablishmentCreateSchema
            break;
        case "Standard_Processus_job":
            formSchema = JobCreateSchema
            break;
        case "Standard_Processus_RateAt":
            formSchema = RateAtCreateSchema
            break;
        case "Standard_Processus_URSSAF":
            formSchema = OpsCreateSchema
            break;
        case "Standard_Processus_AGIRC-ARRCO":
            formSchema = OpsCreateSchema
            break;
        case "Standard_Processus_Prevoyance":
            formSchema = OpsCreateSchema
            break;
        case "Standard_Processus_Mutuelle":
            formSchema = OpsCreateSchema
            break;
        case "Standard_Processus_ccn":
            formSchema = CreateIdccSchema
            break
        case "Standard_Processus_niveau":
            formSchema = CreateClassificationSchema
            break
        case "Standard_Processus_coefficient":
            formSchema = CreateClassificationSchema
            break
        case "Standard_Processus_qualification":
            formSchema = CreateClassificationSchema
            break
        case "Standard_Processus_echelon":
            formSchema = CreateClassificationSchema
            break
        case "Standard_Processus_indice":
            formSchema = CreateClassificationSchema
            break
        case "Standard_Processus_CP":
            formSchema = CreatePaidLeaveSchema
            break
        case "Standard_Processus_services":
            formSchema = CreateServiceSchema
            break
        case "Standard_Processus_Bank":
            formSchema = BankCreateSchema
            break
        case "Standard_Processus_Establisment_Bank":
            formSchema = EstablishmentBankCreateSchema
            break
        case "Standard_Processus_Free_Zones":
            formSchema = FreeZoneCreateSchema
            break
        case "Standard_Processus_Society_Free_Zone":
            formSchema = SocietyFreeZoneCreateSchema
            break
        case "Standard_Processus_Absences":
            formSchema = ProjectAbsenceCreateSchema
            break
        case "Standard_Processus_Salary":
            formSchema = SalaryCreateSchema
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
            ...inputsObject

        },
    })
    const onSubmit = async (data: unknown) => {
        try {
            setLoading(true)
            let action: unknown
            switch (processusSlug) {
                case "Standard_Processus_Society":
                    action = await createSociety(data as z.infer<typeof SocietyCreateSchema>)
                    break;
                case "Standard_Processus_Establishment":
                    action = await createEstablishement(data as z.infer<typeof EstablishmentCreateSchema>)
                    break;
                case "Standard_Processus_job":
                    action = await createJob(data as z.infer<typeof JobCreateSchema>)
                    break;
                case "Standard_Processus_RateAt":
                    action = await createRateAt(data as z.infer<typeof RateAtCreateSchema>)
                    break;
                case "Standard_Processus_URSSAF":
                    action = await createUrssaf(data as z.infer<typeof OpsCreateSchema>)
                    break;
                case "Standard_Processus_AGIRC-ARRCO":
                    action = await createAgircArcco(data as z.infer<typeof OpsCreateSchema>)
                    break;
                case "Standard_Processus_Prevoyance":
                    action = await createPrevoyance(data as z.infer<typeof OpsCreateSchema>)
                    break;
                case "Standard_Processus_Mutuelle":
                    action = await createMutual(data as z.infer<typeof OpsCreateSchema>)
                    break;
                case "Standard_Processus_ccn":
                    action = await createIdcc(data as z.infer<typeof CreateIdccSchema>)
                    break
                case "Standard_Processus_niveau":
                    action = await createNiveau(data as z.infer<typeof CreateClassificationSchema>)
                    break
                case "Standard_Processus_coefficient":
                    action = await createCoefficient(data as z.infer<typeof CreateClassificationSchema>)
                    break
                case "Standard_Processus_echelon":
                    action = await createEchelon(data as z.infer<typeof CreateClassificationSchema>)
                    break
                case "Standard_Processus_indice":
                    action = await createIndice(data as z.infer<typeof CreateClassificationSchema>)
                    break
                case "Standard_Processus_qualification":
                    action = await createQualification(data as z.infer<typeof CreateClassificationSchema>)
                    break
                case "Standard_Processus_CP":
                    action = await createPaidLeave(data as z.infer<typeof CreatePaidLeaveSchema>)
                    break
                case "Standard_Processus_services":
                    action = await createService(data as z.infer<typeof CreateServiceSchema>)
                    break
                case "Standard_Processus_Bank":
                    action = await createBank(data as z.infer<typeof BankCreateSchema>)
                    break
                case "Standard_Processus_Establisment_Bank":
                    action = await createEstablishmentBank(data as z.infer<typeof EstablishmentBankCreateSchema>)
                    break
                case "Standard_Processus_Free_Zones":
                    action = await createFreeZone(data as z.infer<typeof FreeZoneCreateSchema>)
                    break
                case "Standard_Processus_Society_Free_Zone":
                    action = await createSocietyFreeZone(data as z.infer<typeof SocietyFreeZoneCreateSchema>)
                    break
                case "Standard_Processus_Absences":
                    action = await createAbsence(data as z.infer<typeof ProjectAbsenceCreateSchema>)
                    break
                case "Standard_Processus_Salary":
                    action = await createSalary(data as z.infer<typeof SalaryCreateSchema>)
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='gap-4 space-y-8 p-4'>
                <DynamicField inputs={inputs} form={form} options={options} />
                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
            </form>
        </Form >

    )

}