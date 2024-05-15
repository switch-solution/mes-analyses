"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { createPageBlock } from "@/src/features/actions/page/page.actions"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { BlockPageCreateSchema } from "@/src/helpers/definition"
export default function DynamicPageCommande({ clientSlug, pageSlug, htmlElement, placeholder = "Utiliser la touche / pour créer un nouveau bloc", blockMasterId, softwareSlug }: { clientSlug: string, pageSlug: string, htmlElement: 'text' | 'ul' | 'form' | 'select', placeholder?: string, blockMasterId?: string, softwareSlug: string }) {
    const form = useForm<z.infer<typeof BlockPageCreateSchema>>({
        resolver: zodResolver(BlockPageCreateSchema),
        defaultValues: {
            html: "h1",
            clientSlug,
            pageSlug,
            blockMasterId,
            softwareSlug
        }
    })
    const [open, setOpen] = React.useState(false)

    const handleKeyDown = (event: React.KeyboardEvent) => {
        event.preventDefault()
        if (event.key === "/") {
            setOpen((open) => !open)

        }
    }
    const handleSubmit = async (data: z.infer<typeof BlockPageCreateSchema>) => {
        const action = await createPageBlock(data)
        setOpen((open) => !open)

        if (action?.serverError) {
            toast(`${action.serverError}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        } else {
            toast('Création du bloc', {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })

        }

    }

    return (
        <>
            {!open && <Input type="text" onKeyDown={handleKeyDown} placeholder={placeholder} />}
            {open && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="blockMasterId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='hidden' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="clientSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='hidden' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="softwareSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='hidden' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pageSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='hidden' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="html"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Séléctionner un élément" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {htmlElement === 'text' && <SelectGroup>
                                                <SelectLabel>Zone de type texte</SelectLabel>
                                                <SelectItem value="h1">Titre 1</SelectItem>
                                                <SelectItem value="h2">Titre 2</SelectItem>
                                                <SelectItem value="h3">Titre 3</SelectItem>
                                                <SelectItem value="h4">Titre 4</SelectItem>
                                                <SelectItem value="h5">Titre 5</SelectItem>
                                                <SelectItem value="h6">Titre 6</SelectItem>
                                                <SelectItem value="p">Paragraphe</SelectItem>
                                                <SelectItem value="ul">Liste à puce</SelectItem>
                                                <SelectItem value="form">Formulaire</SelectItem>
                                                <SelectItem value="img">Image</SelectItem>

                                            </SelectGroup>
                                            }
                                            {htmlElement === 'form' &&
                                                <SelectGroup>
                                                    <SelectLabel>Zone de type formulaire</SelectLabel>
                                                    <SelectItem value="input_text">Champ texte</SelectItem>
                                                    <SelectItem value="input_number">Champ numérique</SelectItem>
                                                    <SelectItem value="select">Liste déroulante</SelectItem>
                                                    <SelectItem value="switch">Switch</SelectItem>
                                                </SelectGroup>
                                            }
                                            {htmlElement === 'ul' &&
                                                <SelectGroup>
                                                    <SelectLabel>Liste</SelectLabel>
                                                    <SelectItem value="li">Puce</SelectItem>
                                                    <SelectItem value="ol">Nombre</SelectItem>
                                                </SelectGroup>
                                            }
                                            {htmlElement === 'select' &&
                                                <SelectGroup>
                                                    <SelectLabel>Liste</SelectLabel>
                                                    <SelectItem value="option">Valeur</SelectItem>
                                                </SelectGroup>
                                            }


                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit'>Séléctionner</Button>
                    </form>
                </Form>

            )}

        </>

    )
}