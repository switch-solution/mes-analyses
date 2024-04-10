"use client";
import EditUser from "@/components/form/user/editUser";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
export default function Modal({ user }: { user: any }) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === "/profil/edit"} onOpenChange={() => router.back()}>
            <DialogContent>
                <EditUser user={user} />
            </DialogContent>
        </Dialog>
    )
}