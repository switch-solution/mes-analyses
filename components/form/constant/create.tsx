"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from 'react';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SoftwareConstantCreateSchema } from '@/src/helpers/definition'
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { getMySoftware } from "@/src/query/user.query"
import type { getIdcc } from "@/src/query/idcc.query"
import { Input } from '@/components/ui/input'
import { createConstant } from "@/src/features/actions/constant/constant.actions";

export default function ConstantFormCreate({ clientSlug, softwares, idcc }: { clientSlug: string, softwares: getMySoftware, idcc: getIdcc }) {
    const form = useForm<z.infer<typeof SoftwareConstantCreateSchema>>({
        resolver: zodResolver(SoftwareConstantCreateSchema),
        defaultValues: {
            clientSlug: clientSlug,
            label: "",
            level: "Logiciel",
            description: "",
            id: "",
            value: "",
            dateStart: new Date(),
            dateEnd: new Date('4000-01-01'),
            softwareLabel: softwares.at(0)?.softwareLabel,
            idccCode: "9999",

        },
    })
    const onSubmit = async (data: z.infer<typeof SoftwareConstantCreateSchema>) => {
        try {
            const action = await createConstant(data)
            if (action?.serverError) {
                console.log(action.serverError)
            }
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <div className="flex w-full flex-col items-center">
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
                        name="level"
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
                        name="softwareLabel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Choisir votre logiciel</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choisir votre logiciel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {softwares.map((software) => (
                                            <SelectItem key={software.softwareLabel} value={software.softwareLabel}>{software.softwareLabel}</SelectItem>))}
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
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="0001" {...field} required />
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
                                <FormLabel>Libellé</FormLabel>
                                <FormControl>
                                    <Input placeholder="Panier repas" {...field} required />
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Panier repas" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Valeur</FormLabel>
                                <FormControl>
                                    <Input placeholder="5" {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateStart"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date de début</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto size-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateEnd"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date de début</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto size-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="idccCode"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Convention collective</FormLabel>
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
                                                    ? idcc.find(
                                                        (idcc) => idcc.code === field.value
                                                    )?.code
                                                    : "Chercher par code IDCC"}
                                                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Taper un code idcc" />
                                            <CommandEmpty>Pas de code convention.</CommandEmpty>
                                            <CommandGroup>
                                                {idcc.map((convention) => (
                                                    <CommandItem
                                                        value={convention.code}
                                                        key={convention.code}
                                                        onSelect={() => {
                                                            form.setValue("idccCode", convention.code)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                convention.label === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {convention.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Liste des conventions collectives
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
