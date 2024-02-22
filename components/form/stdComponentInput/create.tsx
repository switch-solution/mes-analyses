"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateStdInputSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createStdInput } from '@/src/features/actions/stdInput/stdInput.actions'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
export default function CreateStdInput({ clientSlug, componentSlug, type, setInputType, setCommand }: { clientSlug: string, componentSlug: string, type: string, setInputType: (type: string | undefined) => void, setCommand: (type: boolean) => void }) {
    const form = useForm<z.infer<typeof CreateStdInputSchema>>({
        resolver: zodResolver(CreateStdInputSchema),
        defaultValues: {
            clientSlug: clientSlug,
            componentSlug: componentSlug,
            type: type,
            label: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof CreateStdInputSchema>) => {
        try {
            setInputType(undefined)
            setCommand(false)
            const action = await createStdInput(data)
            console.log(action?.serverError)
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="clientSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" {...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="componentSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" {...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Libellé</FormLabel>
                                <FormControl>
                                    <Input placeholder="Libellé de votre champ" {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Le libellé est le nom de votre champ.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Enregistrer</Button>

                </form>

            </Form>

        </div>
    )
}
