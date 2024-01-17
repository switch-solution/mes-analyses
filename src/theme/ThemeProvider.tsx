"use client"
import React from "react";
import { ThemeProviderProps } from "next-themes/dist/types"
import { ThemeProvider as NextThermesProvider } from 'next-themes'
export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return (
        <NextThermesProvider {...props}>{children}</NextThermesProvider>
    )
}