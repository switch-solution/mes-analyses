"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import About from "@/components/about/about";
export default function Modal() {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === "/about"} onOpenChange={() => router.back()}>
            <DialogContent>
                <About />
            </DialogContent>
        </Dialog>
    )
}