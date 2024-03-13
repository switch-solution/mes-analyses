"use client";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { BookToProjectSchema } from "@/src/helpers/definition";
type Book = {
    id: string,
    name: string,
    status: string,
    softwareId: string,
}
export default function AssociateBookToProjectForm({ projectId, books }: { projectId: string, books: Book[] }) {

    const form = useForm<z.infer<typeof BookToProjectSchema>>({
        resolver: zodResolver(BookToProjectSchema),
        defaultValues: {
            projectId: projectId,
            stdBookId: ""
        },
    })
    const onSubmit = async (data: z.infer<typeof BookToProjectSchema>) => {
        try {
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="flex w-full flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="projectId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                    />
                    <FormField
                        control={form.control}
                        name="stdBookId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Choisir votre organisation</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner vos cahiers" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {books.map((book) => (
                                            <SelectItem key={book.id} value={book.id}>{book.name}</SelectItem>))}

                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Envoyer</Button>

                </form>

            </Form>
        </div>



    )
}