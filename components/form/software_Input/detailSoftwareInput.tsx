"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
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
import { DetailSoftwareInputShema } from "@/src/helpers/definition"
import { Switch } from "@/components/ui/switch"
import type { getSoftwareComponentBySoftwareSlug } from "@/src/query/software_component.query"
import type { getOtherInputs, getDsnInputs } from "@/src/query/input.query"
import { Input } from '@/components/ui/input'
import type { getStandardInputById } from "@/src/query/sofwtare_input.query"
import { detailStdInput } from "@/src/features/actions/software_input/stdInput.actions";
export default function DetailSoftwareInput({ clientSlug, componentSlug, inputSlug, inputs, components, input }: { clientSlug: string, componentSlug: string, inputSlug: string, inputs?: getOtherInputs | getDsnInputs, components?: getSoftwareComponentBySoftwareSlug, input: getStandardInputById }) {
    const form = useForm<z.infer<typeof DetailSoftwareInputShema>>({
        resolver: zodResolver(DetailSoftwareInputShema),
        defaultValues: {
            clientSlug,
            componentSlug,
            inputSlug,
            placeholder: "",
            minLength: 0,
            maxLength: 255,
            minValue: 0,
            maxValue: 9999,
            readonly: false,
            required: false,
            dsnType: "",
            fieldSource: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof DetailSoftwareInputShema>) => {
        try {
            const actions = await detailStdInput(data)
            if (actions.serverError) {
                console.error(actions.serverError)
            }
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <Form {...form} >
            <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
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
                    name="inputSlug"
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
                    name="required"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Champ obligatoire
                                </FormLabel>
                                <FormDescription>
                                    Champ obligatoire pour valider le formulaire
                                </FormDescription>
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
                    name="readonly"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Champ en lecteur uniquement
                                </FormLabel>
                                <FormDescription>
                                    Champ en lecture seule
                                </FormDescription>
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
                {input.type === 'text' && (
                    <>
                        <FormField
                            control={form.control}
                            name="minLength"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Libellé du champ </FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="1" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Nombre minimum de caractères
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxLength"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Libellé du champ </FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="255" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Nombre maximum de caractères
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="placeholder"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Placeholder du champ </FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Mon champ" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Placeholder
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </>


                )}
                {input.type === 'number' && (
                    <>
                        <FormField
                            control={form.control}
                            name="minValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Libellé du champ </FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="1" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Nombre minimum
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Libellé du champ </FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="255" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Nombre maximum
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </>


                )}
                {input.isDsnField && inputs && (
                    <FormField
                        control={form.control}
                        name="dsnType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Champ DSN</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner un champ DSN" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {inputs.map((input) => (
                                            <SelectItem key={input.code} value={input.code}>
                                                {input.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Une valeur de la DSN
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {input.isOtherData && inputs && (
                    <FormField
                        control={form.control}
                        name="otherData"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Autres champs</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner un champ" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {inputs.map((input) => (
                                            <SelectItem key={input.code} value={input.code}>
                                                {input.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Autre valeur
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                )}
                {input.isDependOtherField && components && (
                    <FormField
                        control={form.control}
                        name="fieldSource"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Champ source</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner un champ" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {components.map((component) => (
                                            component.Software_Component_Input.map((input) => (
                                                <SelectItem key={input.id} value={input.id}>
                                                    {`Formulaire ${component.label} ${input.label}`}
                                                </SelectItem>
                                            ))))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Autre valeur
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                )}

                <Button type="submit">Sauvegarder</Button>
            </form>
        </Form >

    )
}
