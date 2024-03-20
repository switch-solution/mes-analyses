"use client";
import * as z from "zod"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { AbsenceCreateSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ButtonLoading } from "@/components/ui/button-loader";
import { Switch } from "@/components/ui/switch"

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
import { createSoftwareAbsence } from "@/src/features/actions/software_absence/software_absence.actions";
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import type { getParamByIdAndSoftwareActive } from "@/src/query/software_setting.query"
import { getCounterForMyActiveSoftware } from "@/src/query/software_counter.query"
import type { getDsnAbsence } from "@/src/query/dsn.query"
export default function CreateSoftwareAbsence({ clientSlug, softwareSlug, methodOfCalcul, counter, dsnCode }: { clientSlug: string, softwareSlug: string, methodOfCalcul: getParamByIdAndSoftwareActive, counter: getCounterForMyActiveSoftware, dsnCode: getDsnAbsence }) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof AbsenceCreateSchema>>({
        resolver: zodResolver(AbsenceCreateSchema),
        defaultValues: {
            id: "",
            clientSlug: clientSlug,
            softwareSlug: softwareSlug,
            methodOfCalcul: "",
            dsnCode: "",
            label: "",
            description: "",
            counter: "",
            population: "",
            isSocialSecurity: false,
            isPrintable: false,

        },
    })
    const onSubmit = async (data: z.infer<typeof AbsenceCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createSoftwareAbsence(data)
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
    console.log(methodOfCalcul)
    return (
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
                    name="softwareSlug"
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
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="" {...field} required />
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
                                <Input type="text" placeholder="" {...field} required />
                            </FormControl>
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
                                <Input placeholder="La description de mon paramètre" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="methodOfCalcul"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Méthode de calcul</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir un mode de calcul" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {methodOfCalcul.map((method) => (<SelectItem key={method.label} value={method.id}>{method.value}</SelectItem>))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dsnCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type DSN</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir un type DSN" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {dsnCode.map((dsn) => (<SelectItem key={dsn.id} value={dsn.id}>{dsn.label}</SelectItem>))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="counter"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Compteurs</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sectionner un compteur" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {counter.map((count) => (<SelectItem key={count.id} value={count.id}>{count.label}</SelectItem>))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isSocialSecurity"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Absence de type sécurité sociale</FormLabel>
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
                <FormField
                    control={form.control}
                    name="isPrintable"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Absence de imprimable</FormLabel>
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

                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}

            </form>

        </Form>

    )
}
