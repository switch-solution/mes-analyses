"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import EditUserEnvironnement from "@/components/form/user_environnement/editUserEnvironnement";

export default function Modal({ clientActive, softwareActive, clients, softwares }: {
    softwareActive: string, clientActive: string,
    softwares: { slug: string, label: string }[],
    clients: { slug: string, socialReason: string, siren: string }[]
}) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === `/profile/default`} onOpenChange={() => router.back()}>
            <DialogContent>
                <EditUserEnvironnement clientActive={clientActive} softwareActive={softwareActive} clients={clients} softwares={softwares} />
            </DialogContent>
        </Dialog>
    )
}