"use client";
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { createStandardInput } from "@/src/features/actions/component/component.action";
import { StandardComposantInputSchema } from '@/src/helpers/definition';
import type { InputStandardType } from "@/src/helpers/type"
import type { getStandardInputType } from '@/src/helpers/type'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"
import { Plus } from 'lucide-react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { set } from 'date-fns';


export default function CreateInput({ componentId, inputType }: {
    componentId: string, inputType: getStandardInputType[]
}) {
    const [type, setType] = useState<InputStandardType>('text')
    const [choiceIsVisible, setChoiceIsVisible] = useState(true)
    const [addInput, setAddInput] = useState(false)
    const form = useForm<z.infer<typeof StandardComposantInputSchema>>({
        resolver: zodResolver(StandardComposantInputSchema),
        defaultValues: {
            label: '',
            required: false,
            readonly: false,
            maxLength: 1,
            minLength: 1,
            minValue: 1,
            maxValue: 1,
            placeholder: '',
            multiple: false,
            order: 1,
            isCode: false,
            isLabel: false,
            isDescription: false,

        }
    })
    const createStandardInputWithId = createStandardInput.bind(null, componentId).bind(null, type)
    const onSubmit = async (values: z.infer<typeof StandardComposantInputSchema>) => {
        try {
            await createStandardInputWithId(values)
            setChoiceIsVisible(() => true)
            setAddInput(() => false)
            setType(() => 'text')
        } catch (err) {
            setChoiceIsVisible(() => true)
            setAddInput(() => false)
            setType(() => 'text')
            console.error(err)
        }

    }

    const onClick = () => {
        setChoiceIsVisible(() => false)
        setAddInput(() => true)
    }

    return (<div>
        {choiceIsVisible ?
            <>
                <span className='flex flex-row' onClick={onClick}><Plus /> Ajouter un champ</span>
            </> :

            addInput ?
                <ChoiceTypeInput inputType={inputType} setType={setType} setAddInput={setAddInput} />
                :

                type ?
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                            <CommonInput form={form} type={type} />
                            {type === 'text' ? <InputText form={form} /> :
                                type === 'number' ? <InputNumber form={form} /> : null}
                            <Button type="submit">Sauvegarder</Button>
                        </form>
                    </Form>
                    : null


        }
    </div>
    )
}

const ChoiceTypeInput = ({ inputType, setType, setAddInput }: {
    inputType: getStandardInputType[],
    setType: any
    setAddInput: any
}) => {
    const onSubmit = async (values: any) => {
        setType(() => values.type)
        setAddInput(() => false)
    }

    const form = useForm({
        defaultValues: {
            type: 'text'
        }

    })

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Selectionner un type de champ</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Texte" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {inputType.map((input) => (
                                        <SelectItem key={input.type} value={input.type}>{input.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Continuer</Button>

            </form>

        </Form>
    )
}

const CommonInput = ({ form, type }: { form: any, type: string }) => {
    console.log('type', type)
    return (<>
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input type="hidden" defaultValue={type} {...field} />
                    </FormControl>

                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Libellé du champ</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Libellé" {...field} />
                    </FormControl>
                    <FormDescription>
                        Indiquer un nom clair et précis pour le champ
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input type="hidden" placeholder="" {...field} required />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input type='hidden' {...field} readOnly required />
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
                            Cette option rendra le champ obligatoire pour  l&apos;utilisateur.
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
                            Champ en lecture seule
                        </FormLabel>
                        <FormDescription>
                            Cette option non éditable
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
    </>

    )
}

const InputText = ({ form }: { form: any }) => {
    return (<>
        <FormField
            control={form.control}
            name="minLength"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">
                            Nombre minimum de caractères
                        </FormLabel>
                        <FormDescription>
                            Cette option non éditable
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />

                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="maxLength"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">
                            Nombre maximum de caractères
                        </FormLabel>
                        <FormDescription>
                            Cette option non éditable
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />

                </FormItem>
            )}
        />
    </>

    )
}

const InputNumber = ({ form }: { form: any }) => {
    return (<>
        <FormField
            control={form.control}
            name="minValue"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">
                            Valeur minimale
                        </FormLabel>

                    </div>
                    <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="maxValue"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">
                            Valeur maximale
                        </FormLabel>
                    </div>
                    <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />

                </FormItem>
            )}
        />
    </>

    )
}