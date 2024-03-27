"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { SocietyCreateStandardSchema } from "@/src/helpers/definition";
import { ButtonLoading } from "@/components/ui/button-loader";
import { createStandardSociety } from "@/src/features/actions/project_standard/project_standard.actions";
import type { getFormInputByIdForMyActiveClientAndSoftware } from "@/src/query/form.query";
import { toast } from "sonner"
import DynamicField from "@/components/ui/dynamic-field"
import {
    Form,
} from "@/components/ui/form"
export default function CreateStandardSociety({ clientSlug, projectSlug, processusSlug, inputs }: { clientSlug: string, projectSlug: string, processusSlug: string, inputs: getFormInputByIdForMyActiveClientAndSoftware }) {
    const [loading, setLoading] = useState(false)
    type FormInputs = z.infer<typeof SocietyCreateStandardSchema>;

    const form = useForm<FormInputs>({
        resolver: zodResolver(SocietyCreateStandardSchema),
        defaultValues: {
            clientSlug: clientSlug,
            processusSlug: processusSlug,
            projectSlug: projectSlug,
            id: "",
            siren: "",
            ape: "",
            socialReason: "",
            address1: "",
            address2: "",
            address3: "",
            address4: "",
            postalCode: "",
            city: "",
            country: "",
            nic: "",

        },
    })
    const onSubmit = async (data: z.infer<typeof SocietyCreateStandardSchema>) => {
        try {
            setLoading(true)
            const action = await createStandardSociety(data)
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
        } catch (err) {
            setLoading(false)
            console.error(err)

        }
    }



    return (
        < Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <DynamicField inputs={inputs} form={form} />
                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
            </form>
        </Form >
    )

}