"use client";

import { deleteSoftware } from "@/src/features/actions/software/software.actions";
import DangerButtonDelete from "@/components/layout/dangerButtonDelete";
import { Form } from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { ButtonDangerDeleteSchema } from "@/src/helpers/definition";
import { useForm } from "react-hook-form"
export default function SoftwareDelete({ softwareId }: { softwareId: string }) {
    const form = useForm<z.infer<typeof ButtonDangerDeleteSchema>>({
        resolver: zodResolver(ButtonDangerDeleteSchema),
        defaultValues: {
            validation: ""
        }

    })

    const deleteInvoiceWithId = deleteSoftware.bind(null, softwareId);
    const onSubmit = async (values: z.infer<typeof ButtonDangerDeleteSchema>) => {
        try {
            await ButtonDangerDeleteSchema.parseAsync(values)
            await deleteInvoiceWithId()
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <Form {...form}  >
            <form action={deleteInvoiceWithId} onSubmit={form.handleSubmit(onSubmit)}>
            </form>
        </Form>

    )
}


