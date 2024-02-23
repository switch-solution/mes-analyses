"use client";
import { uploadDsn } from "@/src/features/actions/dsn/dsn.actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

export default function UploadFileDsn({ projectSlug }: { projectSlug: string }) {

    const uploadDsnWithProjectId = uploadDsn.bind(null, projectSlug)

    return (
        <div>

            <form action={uploadDsnWithProjectId}>
                <Label htmlFor="dsn">DSN</Label>
                <Input id="dsn" name="dsn" type="file" accept=".dsn" required />
                <Button type="submit">Envoyer</Button>
            </form>
        </div>

    )

}