"use client";

import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SoftwareItemSchema } from '@/src/helpers/definition';
import { useForm } from "react-hook-form"
import type { getIdccByCodeType, getSoftwareByUserIsEditorType } from '@/src/helpers/type';
import { Button } from "@/components/ui/button"
import { createSoftwareItem } from "@/src/features/actions/softwareItems/softwareItems.actions"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export default function Create({ softwares, idccList }: { softwares: getSoftwareByUserIsEditorType[], idccList: getIdccByCodeType[] }) {

    const form = useForm<z.infer<typeof SoftwareItemSchema>>({
        resolver: zodResolver(SoftwareItemSchema),
        defaultValues: {
            id: "",
            label: "",
            type: "Salaire de base",
            description: "",
            idccCode: "9999",
            softwareId: "",
            status: "actif",
        },
    })
    const onSubmit = async (data: z.infer<typeof SoftwareItemSchema>) => {
        try {
            SoftwareItemSchema.parse(data)
            console.log(data)
            await createSoftwareItem(data)
        } catch (err) {
            console.log(err)
            throw new Error("Erreur lors de la création de la rubrique.")
        }

    }
    return (
        <div className="flex flex-col w-full items-center">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="idccCode"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Code Idcc</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-[200px] justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? idccList.find(
                                                        (idcc) => idcc.code === field.value
                                                    )?.code
                                                    : "Séléctionner un code Idcc"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search language..." />
                                            <CommandEmpty>Pas de code.</CommandEmpty>
                                            <CommandGroup>
                                                {idccList.map((idcc) => (
                                                    <CommandItem
                                                        value={idcc.code}
                                                        key={idcc.code}
                                                        onSelect={() => {
                                                            form.setValue("idccCode", idcc.code)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                idcc.code === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {idcc.code}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="softwareId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logiciel</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner votre logiciel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {softwares.map((software) => (
                                            <SelectItem key={software.id} value={software.id}>{software.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type de rubrique</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Type de rubrique" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Salaire de base">Salaire de base</SelectItem>
                                        <SelectItem value="Prime">Prime</SelectItem>
                                        <SelectItem value="Cotisation">Cotisation</SelectItem>
                                        <SelectItem value="Rubrique de net">Rubrique de net</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code de la rubrique</FormLabel>
                                <FormControl>
                                    <Input placeholder="0001" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Libellé rubrique</FormLabel>
                                <FormControl>
                                    <Input placeholder="Salaire de base" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description de la rubrique</FormLabel>
                                <FormControl>
                                    <Input placeholder="Salaire de base" {...field} />
                                </FormControl>
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