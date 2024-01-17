"use client"
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Loader } from "@/components/ui/loader";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
export const LogoutButton = () => {
    const [isPending, startTransition] = useTransition()
    return (
        <DropdownMenuItem onClick={() => startTransition(() => signOut())}>
            {isPending ? <Loader className="mr-2 h-4 w-4" /> : (<LogOut className="mr-2 h-4 w-4" />)}Se déconnecter
        </DropdownMenuItem>
    )

}