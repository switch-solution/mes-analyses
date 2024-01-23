import React from "react";
import { getAuthSession } from "@/lib/auth";
import { NavBar } from "./NavBar";
import Link from "next/link";
export const Header = async () => {
    const session = await getAuthSession()
    return (
        <header className="border-bg border-b-accent flex flex-row items-center w-full border-b-2">
            <h2 className="text-2xl font-bold mr-auto"><Link href={`/home`}>Mes analyses</Link></h2>
            <NavBar />
        </header >
    )
}