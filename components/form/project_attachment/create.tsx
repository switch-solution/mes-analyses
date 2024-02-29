"use client";
import React from "react"
import { uploadFile } from "@/src/features/actions/attachment/attachment.actions";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { getTaskBySlug } from "@/src/query/project_task.query";



export default function UploadFile({ projectSlug, clientSlug, task }: { projectSlug: string, clientSlug: string, task: getTaskBySlug }) {
    const uploadFileWithName = uploadFile.bind(null, task.label, projectSlug, clientSlug)
    return (

        <form action={uploadFileWithName}>
            <Label htmlFor="pdf">{task.label}</Label>
            <Input type="file" id={task.label} name={task.label} accept={task.accept ? task.accept : undefined} required />
            <Button type="submit">Envoyer</Button>
        </form>

    )

}