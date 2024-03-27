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
import type { getFormInputByIdForMyActiveClientAndSoftware } from "@/src/query/form.query";

export default function DynamicField({ inputs, form }: { inputs: getFormInputByIdForMyActiveClientAndSoftware, form: any }) {

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
                                        <FormDescription>
                                            {input.label}
                                        </FormDescription>
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
                                            <FormLabel>{input.label}</FormLabel>
                                            <FormControl>
                                                <Input type="number" min={input.min ? input.min : 0} max={input.max ? input.max : 999} required={input.required} readOnly={input.readOnly} placeholder={input.placeholder ? input.placeholder : ""} {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                {input.label}
                                            </FormDescription>
                                            <FormMessage />
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