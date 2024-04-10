"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import EditClient from "@/components/form/client/editClient";
export default function Modal({ clientSlug, client }: { clientSlug: string, client: {} }) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === `/client/${clientSlug}/administration/edit`} onOpenChange={() => router.back()}>
            <DialogContent>
                <EditClient slug={clientSlug} client={client} />
            </DialogContent>
        </Dialog>
    )
}