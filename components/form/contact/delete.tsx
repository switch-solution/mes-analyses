"use client";

import { deleteContact } from "@/src/features/actions/contact/contact.actions";
import DangerButtonDelete from "../../../src/features/layout/dangerButtonDelete";
import { Form } from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { ButtonDangerDeleteSchema } from "@/src/helpers/definition";
import { useForm } from "react-hook-form"
export default function ContactDelete({ contactId }: { contactId: string }) {
    const form = useForm<z.infer<typeof ButtonDangerDeleteSchema>>({
        resolver: zodResolver(ButtonDangerDeleteSchema),
        defaultValues: {
            validation: ""
        }

    })

    const deleteContactWithId = deleteContact.bind(null, contactId);
    const onSubmit = async (values: z.infer<typeof ButtonDangerDeleteSchema>) => {
        try {
            await ButtonDangerDeleteSchema.parseAsync(values)
            await deleteContactWithId()
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <Form {...form}  >
            <form action={deleteContactWithId} onSubmit={form.handleSubmit(onSubmit)}>
            </form>
        </Form>

    )
}


