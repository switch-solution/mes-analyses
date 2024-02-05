import React from "react";
import { getAuthSession } from "@/lib/auth";
import { NavBar } from "./NavBar";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import UserAVatar from "./UserAvatar";
export const Header = async () => {
    const session = await getAuthSession()
    return (
        <header className="border-bg border-b-accent flex flex-row items-center justify-end w-full border-b-2">
            <NavBar />
            <UserAVatar />
            <ThemeToggle />

        </header >
    )
}