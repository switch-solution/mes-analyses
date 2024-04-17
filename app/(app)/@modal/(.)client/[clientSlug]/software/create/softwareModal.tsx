"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import CreateSoftware from "@/components/form/software/createSoftware";
export default function Modal({ clientSlug }: { clientSlug: string }) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === `/client/${clientSlug}/software/create`} onOpenChange={() => router.back()}>
            <DialogContent>
                <CreateSoftware clientSlug={clientSlug} />
            </DialogContent>
        </Dialog>
    )
}