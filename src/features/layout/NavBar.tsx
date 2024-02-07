import React from "react";
import { LoginButton } from "../auth/LoginButton";
import { getAuthSession } from "@/lib/auth";
import { UserMenu } from "../auth/UserMenu";
export const NavBar = async () => {
    const session = await getAuthSession()

    return (<nav className="absolute top-0 left-0">
        {session?.user ? <UserMenu /> : <LoginButton label={'Se connecter'} />}

    </nav>)

}