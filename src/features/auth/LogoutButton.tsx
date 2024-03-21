"use client"
import React, { useTransition } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
export const LogoutButton = () => {
    const [isPending, startTransition] = useTransition()
    return (
        <Button variant='ghost' size='sm' onClick={() => startTransition(() => signOut({ callbackUrl: '/api/auth/signin' }))}>
            <LogOut />
        </Button>
    )

}