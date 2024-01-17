"use client"
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { Loader } from "@/components/ui/loader";
export const LoginButton = () => {
    const [isPending, startTransition] = useTransition()
    return (
        <Button onClick={() => startTransition(() => signIn())}>
            {isPending ? <Loader className="mr-2 h-4 w-4" /> : (<LogIn className="mr-2 h-4 w-4" />)}Se connecter

        </Button>
    )

}