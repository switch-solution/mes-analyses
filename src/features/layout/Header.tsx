import React from "react";
import { ThemeToggle } from "../../theme/ThemeToggle";
import { LoginButton } from "../auth/LoginButton";
import { getAuthSession } from "@/lib/auth";
import { UserProfil } from "../auth/UserProfil";
export const Header = async () => {
    const session = await getAuthSession()
    return (
        <header className="border-bg border-b-accent">
            <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
                <h2 className="text-2xl font-bold mr-auto">Mes analyses</h2>
                <ThemeToggle />
                {session?.user ? <UserProfil /> : <LoginButton />}
            </div>
        </header >
    )
}