"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import CreateProject from "@/components/form/project/createProject"

export default function Modal({ clientSlug }: { clientSlug: string }) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === `/client/${clientSlug}/project/create`} onOpenChange={() => router.back()}>
            <DialogContent>
                <CreateProject clientSlug={clientSlug} />
            </DialogContent>
        </Dialog>
    )
}