"use client"
import { useTheme } from "next-themes";
import React from "react";
export const ThemeToggle = () => {
    const { setTheme, theme } = useTheme()
    return (
        <>
            {theme === 'light' ? <span onClick={() => setTheme(theme === 'light' ? "dark" : "light")}>Thème sombre</span> : <span onClick={() => setTheme(theme === 'light' ? "dark" : "light")}>Thème clair</span>}
        </>
    )
}