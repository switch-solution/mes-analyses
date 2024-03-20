"use client"
import { useTheme } from "next-themes";
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export const ThemeToggle = () => {
    const { setTheme, theme } = useTheme()
    const onValueChange = (value: string) => {
        setTheme(value)
    }
    return (
        <>
            <Select onValueChange={onValueChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selectionner un thême" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Thême</SelectLabel>
                        <SelectItem value="light">Clair</SelectItem>
                        <SelectItem value="dark">Sombre</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}