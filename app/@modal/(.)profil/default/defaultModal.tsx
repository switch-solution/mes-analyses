"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import EditUserEnvironnement from "@/components/form/user_environnement/editUserEnvironnement";
import type { getMySoftware, getMySoftwareActive, getMyClientActive, getMyClient, } from "@/src/query/user.query"

export default function Modal({ clientActive, softwareActive, clients, softwares }: { softwareActive: getMySoftwareActive, clientActive: getMyClientActive, softwares: getMySoftware, clients: getMyClient }) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === `/profil/default`} onOpenChange={() => router.back()}>
            <DialogContent>
                <EditUserEnvironnement clientActive={clientActive} softwareActive={softwareActive} clients={clients} softwares={softwares} />
            </DialogContent>
        </Dialog>
    )
}