import React from "react";
import { ThemeToggle } from "../../theme/ThemeToggle";
import { LoginButton } from "../auth/LoginButton";
import { getAuthSession } from "@/lib/auth";
import { UserMenu } from "../auth/UserMenu";
export const NavBar = async () => {
    const session = await getAuthSession()

    return (<nav className="container flex items-center py-2 max-w-lg m-auto gap-1 justify-end">
        {session?.user ? <UserMenu /> : <LoginButton label={'Se connecter'} />}
        <ThemeToggle />

    </nav>)

}