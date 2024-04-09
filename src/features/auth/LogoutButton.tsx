"use client"
import React, { useTransition } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
export const LogoutButton = () => {
    const [isPending, startTransition] = useTransition()
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant='ghost' size='sm' onClick={() => startTransition(() => signOut({ callbackUrl: '/api/auth/signin' }))}>
                    <LogOut className="size-5" />
                    <span className="sr-only">Se déconnecter</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Se déconnecter</TooltipContent>
        </Tooltip >

    )




}