"use client";
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import Container from "@/components/layout/container";
import { FeedbackCreateSchema } from '@/src/helpers/definition'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { createFeedback } from "@/src/features/actions/feedback/feedback.actions";
export default function FeedBackForm() {
    const router = useRouter()

    const form = useForm<z.infer<typeof FeedbackCreateSchema>>({
        resolver: zodResolver(FeedbackCreateSchema),
        defaultValues: {
            feature: "Autre élément",
            message: "",
            level: "Suggestion",
            isBlocked: false,
        }
    })
    const onSubmit = async (data: z.infer<typeof FeedbackCreateSchema>) => {
        try {
            const action = await createFeedback(data)
            if (action?.serverError) {
                console.error(action.serverError)
            }
            router.back()
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <Container>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="feature"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fonctionnalité</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner une fonctionnalité" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Projet">Projet</SelectItem>
                                        <SelectItem value="Client">Client</SelectItem>
                                        <SelectItem value="Editeur">Editeur</SelectItem>
                                        <SelectItem value="DSN">DSN</SelectItem>
                                        <SelectItem value="Taches">Taches</SelectItem>
                                        <SelectItem value="Autre élément">Autre élément</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Suggestion">Suggestion</SelectItem>
                                        <SelectItem value="Anomalie">Anomalie</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Input {...field} required />
                                </FormControl>
                                <FormDescription>
                                    Votre message
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isBlocked"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Point bloquant
                                    </FormLabel>

                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
                <Button type="submit">Envoyer</Button>
            </Form>

        </Container>

    )

}