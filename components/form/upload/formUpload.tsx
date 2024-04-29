
"use client";
import { uploadFile } from "@/src/features/actions/upload/upload.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function UploadFile({ projectSlug, clientSlug }: { projectSlug: string, clientSlug: string }) {

    return (
        <form action={uploadFile}>
            <Input type="hidden" id="clientSlug" name="clientSlug" value={clientSlug} required />
            <Input type="hidden" id="projectSlug" name="projectSlug" value={projectSlug} required />
            <Label htmlFor="label">Libellé</Label>
            <Input type="text" id="label" name="label" required />
            <Label htmlFor="file">Image</Label>
            <Input type="file" id="file" name="file" accept=".pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
            <Button>Envoyer votre fichier</Button>
        </form>

    );

}