"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import IndicatorBdd from "@/components/indicatorBdd/indicatorBdd";
import type { getCountAllTables } from "@/src/query/bdd.query";
export default function Modal({ count }: { count: getCountAllTables }) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === "/about/indicator"} onOpenChange={() => router.back()}>
            <DialogContent>
                <IndicatorBdd count={count} />
            </DialogContent>
        </Dialog>
    )
}