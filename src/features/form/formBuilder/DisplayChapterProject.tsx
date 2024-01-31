"use client";
import React from "react";
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import type { getComposantsAndInputAndValueByChapterId } from "@/src/query/composant.query"
export default function DisplayChapterProject({ composants }: { composants: getComposantsAndInputAndValueByChapterId[] }) {
    return (

        <div className="py-2">
            {composants.map((composant) => composant.Input.map((input) =>
                <p key={input.id}>{JSON.stringify(input)}</p>

            ))}
        </div>

    )
}