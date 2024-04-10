"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import CreateApiKey from "@/components/form/client_api/createClientApi";
export default function Modal({ clientSlug }: { clientSlug: string }) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === `/client/${clientSlug}/administrator/api/create`} onOpenChange={() => router.back()}>
            <DialogContent>
                <CreateApiKey clientSlug={clientSlug} />
            </DialogContent>
        </Dialog>
    )
}