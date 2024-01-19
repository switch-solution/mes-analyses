import React from "react";
import { getAuthSession } from "@/lib/auth";
import { NavBar } from "./NavBar";
export const Header = async () => {
    const session = await getAuthSession()
    return (
        <header className="border-bg border-b-accent flex flex-row items-center w-full border-b-2">
            <h2 className="text-2xl font-bold mr-auto">Mes analyses</h2>
            <NavBar />
        </header >
    )
}