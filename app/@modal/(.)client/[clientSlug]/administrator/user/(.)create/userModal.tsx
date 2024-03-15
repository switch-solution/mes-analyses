"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import CreateUser from "@/components/form/user/createUser";
export default function Modal({ clientSlug }: { clientSlug: string }) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === `/client/${clientSlug}/administrator/user/create`} onOpenChange={() => router.back()}>
            <DialogContent>
                <CreateUser clientSlug={clientSlug} />
            </DialogContent>
        </Dialog>
    )
}