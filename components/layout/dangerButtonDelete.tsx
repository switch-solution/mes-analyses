"use client";
import React from "react";

import { Button } from "@/components/ui/button"
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
import type { UseFormReturn } from "react-hook-form"

export default function DangerButtonDelete({ form }: {
    form: UseFormReturn<{
        validation: string;
    }, any>
}) {

    return (
        <div className="flex flex-col w-full items-center">

            <FormField
                control={form.control}
                name="validation"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Validation de la suppression</FormLabel>
                        <FormControl>
                            <Input placeholder="oui" {...field} required />
                        </FormControl>
                        <FormDescription>
                            Taper &quot;oui&quot; pour confirmer cette action est irréversible.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" variant="destructive">Confirmer</Button>

        </div>
    )
}