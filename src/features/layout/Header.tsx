import React from "react";
import { ThemeToggle } from "../../theme/ThemeToggle";

export const Header = async () => {
    return (
        <header className="border-bg border-b-accent">
            <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
                <h2 className="text-2xl font-bold mr-auto">Mes analyses</h2>
                <ThemeToggle />
            </div>
        </header>
    )
}