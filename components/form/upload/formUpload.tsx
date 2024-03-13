"use client";
import { uploadFile } from '@/src/features/actions/upload/upload.actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
export default function FormUpload({ clientSlug, componentSlug }: { clientSlug: string, componentSlug: string }) {
    return (
        <form action={uploadFile}>
            <Label htmlFor="file">Image</Label>
            <Input type="hidden" name="clientSlug" defaultValue={clientSlug} required />
            <Input type="hidden" name="componentSlug" defaultValue={componentSlug} required />
            <Input type="file" id="file" name="file" accept=".webp,.png,.jpeg" required />
            <Button type="submit">Envoyer</Button>
        </form>
    );
}