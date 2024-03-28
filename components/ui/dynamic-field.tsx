"use client"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import type { TypeDynamicInput } from "@/src/helpers/type"
import type { getSelectOptions } from "@/src/query/form.query";
export default function DynamicField({ inputs, form, options }: {
    inputs: TypeDynamicInput
    , form: any,
    options: getSelectOptions
}) {

    return (
        <>
            <FormField
                control={form.control}
                name="clientSlug"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="hidden" readOnly {...field} required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )}
            />
            <FormField
                control={form.control}
                name="table"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="hidden" readOnly {...field} required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )}
            />
            <FormField
                control={form.control}
                name="processusSlug"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="hidden" readOnly {...field} required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )}
            />

            <FormField
                control={form.control}
                name="projectSlug"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="hidden" readOnly {...field} required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )}
            />
            <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="hidden" readOnly {...field} required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )}
            />
            {
                inputs.map(input => {
                    return (
                        input.type === "text" ?
                            <FormField
                                key={input.zodLabel}
                                control={form.control}
                                name={input.zodLabel as any}
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>{input.label}</FormLabel>
                                        <FormControl>
                                            <Input type="text" minLength={input.minLenght ? input.minLenght : 0} maxLength={input.maxLenght ? input.maxLenght : 999} required={input.required} readOnly={input.readOnly} placeholder={input.placeholder ? input.placeholder : ""} {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />
                            :
                            input.type === "number" ?
                                <FormField
                                    key={input.zodLabel}
                                    control={form.control}
                                    name={input.zodLabel as any}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full max-w-sm items-center space-x-2">
                                                <FormLabel>{input.label}</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min={input.min ? input.min : 0} max={input.max ? input.max : 999} required={input.required} readOnly={input.readOnly} placeholder={input.placeholder ? input.placeholder : ""} {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    {input.label}
                                                </FormDescription>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                :
                                input.type === "select" && input.selectTableSource === 'Project_Society' && input.selectFieldSource === 'siren' ?
                                    < FormField
                                        key={input.zodLabel}
                                        control={form.control}
                                        name={input.zodLabel as any}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{input.label}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selectioner votre société" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {options.sirenList.map((option) => {
                                                            return (
                                                                <SelectItem key={option.siren} value={option.siren}>
                                                                    {option.socialReason}
                                                                </SelectItem>
                                                            )

                                                        })}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> :
                                    input.type === "switch" ?
                                        <FormField
                                            key={input.zodLabel}
                                            control={form.control}
                                            name={input.zodLabel as any}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">
                                                            {input.label}
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
                                        : undefined

                    )
                })

            }
        </>

    )

}