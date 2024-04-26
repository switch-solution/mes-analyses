"use client";
import { EditCgv } from "@/components/form/profil/editCgv";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
export default function Modal({ cgv }: { cgv: boolean }) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === "/cgv"} onOpenChange={() => router.back()}>
            <DialogContent>
                <EditCgv cgv={cgv} />
            </DialogContent>
        </Dialog>
    )
}