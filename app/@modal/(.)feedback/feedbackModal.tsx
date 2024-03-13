"use client";
import FeedBackForm from "@/components/form/feedback/feebackForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
export default function Modal() {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === "/feedback"} onOpenChange={() => router.back()}>
            <DialogContent>
                <FeedBackForm />
            </DialogContent>
        </Dialog>
    )
}