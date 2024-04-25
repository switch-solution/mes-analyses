"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import EditProject from "@/components/form/project/editProject";

export default function Modal({ clientSlug, projectSlug, project }: {
    clientSlug: string, projectSlug: string, project: {
        label: string;
        description: string;
        status: 'Actif' | 'Archivé' | 'En attente';
    }
}) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === `/client/${clientSlug}/project/${projectSlug}/edit`} onOpenChange={() => router.back()}>
            <DialogContent>
                <EditProject clientSlug={clientSlug} projectSlug={projectSlug} project={project} />
            </DialogContent>
        </Dialog>
    )
}