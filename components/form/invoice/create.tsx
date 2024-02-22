"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createInvoices } from "@/src/features/actions/invoice/invoice.actions"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateInvoiceSchema } from "@/src/helpers/definition";
import { Button } from "@/components/ui/button";
export default function CreateInvoice() {
    const form = useForm<z.infer<typeof CreateInvoiceSchema>>({
        resolver: zodResolver(CreateInvoiceSchema),
        defaultValues: {
            date: new Date().toLocaleDateString()
        },
    })
    return (

        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form action={createInvoices}>
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom de votre projet</FormLabel>
                                <FormControl>
                                    <Input type="date" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <Button type="submit">Créer</Button>
                </form>
            </Form>
        </div>
    )

}