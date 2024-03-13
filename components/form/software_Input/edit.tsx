"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { EdidStdInputSchema } from '@/src/helpers/definition'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { editStdInput } from '@/src/features/actions/software_input/stdInput.actions'
import type { getStandardInputById } from '@/src/query/sofwtare_input.query'
import { Switch } from "@/components/ui/switch"
import type { getInputs } from '@/src/query/input.query'
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
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
export default function EditStdInput({ clientSlug, componentSlug, input, inputsType }: { clientSlug: string, componentSlug: string, input: getStandardInputById, inputsType: getInputs }) {
    const dsnInput = inputsType.filter((input) => input.isDsn === true)
    const otherData = inputsType.filter((input) => input.isOtherData === true)
    const form = useForm<z.infer<typeof EdidStdInputSchema>>({
        resolver: zodResolver(EdidStdInputSchema),
        defaultValues: {
            clientSlug: clientSlug,
            componentSlug: componentSlug,
            id: input.id,
            defaultValue: input.defaultValue ? input.defaultValue : '',
            label: input.label,
            minLength: input.minLength ? input.minLength : 0,
            maxLength: input.maxLength ? input.maxLength : 255,
            required: input.required ? input.required : false,
            readonly: input.readonly ? input.readonly : false,
            placeholder: input.placeholder ? input.placeholder : 'Saisir une valeur',
            minValue: input.minValue ? input.minValue : 0,
            maxValue: input.maxValue ? input.maxValue : 9999,
            isCode: input.isCode ? input.isCode : false,
            otherData: input.otherData ? input.otherData : '',
            isLabel: input.isLabel ? input.isLabel : false,
            isDescription: input.isDescription ? input.isDescription : false,
        },
    })
    const onSubmit = async (data: z.infer<typeof EdidStdInputSchema>) => {
        try {
            const action = await editStdInput(data)
            console.log(action?.serverError)
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
                        name="id"
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
                    <div className="flex flex-col justify-between lg:flex-row">
                        <FormField
                            control={form.control}
                            name="isCode"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Champ de type code
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
                        <FormField
                            control={form.control}
                            name="isLabel"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Champ de type libellé
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
                        <FormField
                            control={form.control}
                            name="isDescription"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Champ de type description
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
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row">

                        <FormField
                            control={form.control}
                            name="required"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Champ obligatoire
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
                        <FormField
                            control={form.control}
                            name="readonly"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Champ en lecture seul
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
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row">
                        <FormField
                            control={form.control}
                            name="otherData"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Autres données</FormLabel>
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
                                                        ? otherData.find(
                                                            (other) => other.code === field.value
                                                        )?.label
                                                        : "Choisir "}
                                                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search language..." />
                                                <CommandEmpty>Pas de champ.</CommandEmpty>
                                                <CommandGroup>
                                                    {otherData.map((other) => (
                                                        <CommandItem
                                                            value={other.code}
                                                            key={other.code}
                                                            onSelect={() => {
                                                                form.setValue("otherData", other.code)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    other.label === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {other.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Choisir un autre type de champ
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dsnType"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>DSN</FormLabel>
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
                                                        ? dsnInput.find(
                                                            (dsn) => dsn.code === field.value
                                                        )?.label
                                                        : "Choisir "}
                                                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search language..." />
                                                <CommandEmpty>Pas de champ DSN.</CommandEmpty>
                                                <CommandGroup>
                                                    {dsnInput.map((dsn) => (
                                                        <CommandItem
                                                            value={dsn.code}
                                                            key={dsn.code}
                                                            onSelect={() => {
                                                                form.setValue("dsnType", dsn.code)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    dsn.label === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {dsn.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Choisir le type de champ DSN
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col justify-between lg:flex-row">

                        {input.type === 'text' &&
                            <>
                                <FormField
                                    control={form.control}
                                    name="minLength"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre miniumum de caractère</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                La valeur doit etre positive
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
                                            <FormLabel>Nombre maximum de caractère</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                La valeur doit etre positive
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
                                            <FormLabel>Placeholder</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Donner un exemple de valeur à saisir
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="defaultValue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Valeur par default</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Saisir une valeur par default
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>



                        }
                    </div>
                    <Button type="submit">Enregistrer</Button>

                </form>

            </Form>

        </div>
    )
}

