"use client"
import React, { useTransition } from "react";
import { signOut } from "next-auth/react";
import { Loader } from "@/components/ui/loader";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
export const LogoutButton = () => {
    const [isPending, startTransition] = useTransition()
    return (
        <DropdownMenuItem onClick={() => startTransition(() => signOut())}>
            {isPending ? <Loader className="mr-2 size-4" /> : <span>Se déconnecter</span>}
        </DropdownMenuItem>
    )

}