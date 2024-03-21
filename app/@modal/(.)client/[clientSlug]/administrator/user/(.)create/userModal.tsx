"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import CreateUser from "@/components/form/user/createUser";
import type { getMySoftware } from "@/src/query/user.query";
export default function Modal({ clientSlug, softwares }: { clientSlug: string, softwares: getMySoftware }) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === `/client/${clientSlug}/administrator/user/create`} onOpenChange={() => router.back()}>
            <DialogContent>
                <CreateUser clientSlug={clientSlug} softwares={softwares} />
            </DialogContent>
        </Dialog>
    )
}