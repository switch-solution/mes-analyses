"use client";
import React from "react"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { uploadFile } from "@/src/features/actions/attachment/attachment.actions";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { AttachmentSchema } from "@/src/helpers/definition";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export default function CreateAttachment({ projetId }: { projetId: string }) {
    const form = useForm<z.infer<typeof AttachmentSchema>>({
        resolver: zodResolver(AttachmentSchema),
        defaultValues: {
            label: "",
            description: "",
            projectId: projetId,
            file: new File([], "")
        },
    })

    const uploadFileWithProjectId = uploadFile.bind(null, projetId)
    return (
        <form action={uploadFileWithProjectId}>
            <Label htmlFor="pdf">Picture</Label>
            <Input type="file" id="pdf" name="pdf" />
            <Button type="submit">Envoyer</Button>
        </form>


    )

}