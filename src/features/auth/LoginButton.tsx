"use client"
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { Loader } from "@/components/ui/loader";
import type { variantType } from "@/src/helpers/variantType";

export const LoginButton = ({ label, variantChoice = 'default' }: { label: string, variantChoice?: variantType }) => {
    const [isPending, startTransition] = useTransition()
    return (
        <Button variant={variantChoice} onClick={() => startTransition(() => signIn())}>
            {isPending ? <Loader className="mr-2 h-4 w-4" /> : (<LogIn className="mr-2 h-4 w-4" />)}{label}
        </Button>
    )

}