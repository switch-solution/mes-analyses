"use client";
import React from "react"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { uploadFile } from "@/src/features/actions/attachment/attachment.actions";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import UploadFileDsn from "@/components/form/dsn/upload";
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
import type { getProjectAttachmentNotDelivered } from "@/src/query/project_attachment.query"

const FormSchema = z.object({
    attachment: z
        .string({
            required_error: "Please select an email to display.",
        })
})

type InputAttributes = {
    accept: string
    multiple: boolean
    name: string
}


export default function UploadFile({ projectSlug, attachments }: { projectSlug: string, attachments: getProjectAttachmentNotDelivered }) {
    const [selectedAttachment, setSelectedAttachment] = useState<string | undefined>()
    const [inputAttributes, setInputAttributes] = useState<InputAttributes | undefined>()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    function onSubmit(data: z.infer<typeof FormSchema>) {
        const findFile = attachments.find((attachment) => attachment.label === data.attachment)
        if (!findFile) throw new Error("File not found")
        setSelectedAttachment(data.attachment)
        setInputAttributes({
            accept: findFile.accept,
            multiple: findFile.multiple,
            name: findFile.label
        })
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="attachment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fichiers</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner une PJ" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {attachments.map((attachment) => <SelectItem key={attachment.label} value={attachment.label}>{attachment.label}</SelectItem>)}

                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            {selectedAttachment === "DSN" && inputAttributes ?
                <UploadFileDsn projectSlug={projectSlug} /> :
                <form action={uploadFile}>
                    <Label htmlFor="pdf">Picture</Label>
                    <Input type="file" id={inputAttributes?.name} name={inputAttributes?.name} accept={`.${inputAttributes?.accept}`} required />
                    <Button type="submit">Envoyer</Button>
                </form>
            }

        </div>



    )

}