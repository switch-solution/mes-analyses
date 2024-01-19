import React from "react";
import { ThemeToggle } from "../../theme/ThemeToggle";
import { LoginButton } from "../auth/LoginButton";
import { getAuthSession } from "@/lib/auth";
import { UserProfil } from "../auth/UserProfil";

export const NavBar = async () => {
    const session = await getAuthSession()

    return (<nav className="container flex items-center py-2 max-w-lg m-auto gap-1 justify-end">
        <ThemeToggle />
        {session?.user ? <UserProfil /> : <LoginButton label={'Se connecter'} />}

    </nav>)

}