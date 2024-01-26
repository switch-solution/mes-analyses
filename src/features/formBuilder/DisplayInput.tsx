"use client";
import React from "react"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from 'use-debounce';
import { Label } from "@/components/ui/label"
import { MoveUp, MoveDown } from "lucide-react";
import { updateStandardInputOrder } from "@/src/features/actions/component/component.action"
import type { Standard_Composant_Input } from "@/src/features/form/component/addInput"
export default function DisplayInput({ input, orderMax }: { input: Standard_Composant_Input, orderMax: number }) {
    const moveUp = useDebouncedCallback(async () => {
        const newOrder = input.order - 1 < 0 ? 1 : input.order - 1
        await updateStandardInputOrder(input.id, newOrder, 'up')
    }, 1000)
    const moveDown = useDebouncedCallback(async () => {
        const newOrder = input.order + 1
        await updateStandardInputOrder(input.id, newOrder, 'down')
    }, 1000)
    return (
        input.type === "text" ?
            <div >

                <div className="py-2">
                    <Label htmlFor={input.id}>{input.label}</Label>
                    <div className="flex flex-row items-center">
                        {input.order === 1 ? undefined : <MoveUp onClick={moveUp} />}
                        {input.order === orderMax ? undefined : <MoveDown onClick={moveDown} />}
                        <Input type={input.type} name={input.id} id={input.id} placeholder={input.label} maxLength={input.maxLength} minLength={input.minLength} required={input.required} readOnly={input.readonly} />

                    </div>

                </div>

            </div>

            : undefined

    )


}