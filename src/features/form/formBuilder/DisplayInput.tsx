"use client";
import React from "react";
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from 'use-debounce';
import { Label } from "@/components/ui/label"
import { MoveUp, MoveDown } from "lucide-react";
import { updateStandardInputOrder } from "@/src/features/actions/component/component.action"
import type { Standard_Composant_Input } from "@/src/features/form/formBuilder/AddInput"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
        input.type === "text" || input.type === "number" ?
            <div className="py-2">
                <Label htmlFor={input.id}>{input.label}</Label>
                <div className="flex flex-row items-center">
                    {input.order === 1 ? <MoveUp className="invisible" /> : <MoveUp onClick={moveUp} />}
                    {input.order === orderMax ? <MoveDown className="invisible" /> : <MoveDown onClick={moveDown} />}
                    <Input type={input.type} name={input.id} id={input.id} required={input.required} readOnly={input.readonly}
                        placeholder={input.label} maxLength={input.maxLength ? input.maxLength : undefined}
                        minLength={input.minLength ? input.minLength : undefined}
                        min={input.minValue ? input.minValue : undefined}
                        max={input.maxValue ? input.maxValue : undefined} />
                </div>
            </div>
            :
            input.type === "select" ?
                <div className="py-2">
                    <div className="flex flex-row items-center">
                        {input.order === 1 ? undefined : <MoveUp onClick={moveUp} />}
                        {input.order === orderMax ? undefined : <MoveDown onClick={moveDown} />}
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="placeholder" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{input.label}</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                :

                input.type.slice(0, 3) === "dsn" ?
                    <div className="py-2">
                        <div className="flex flex-row items-center">
                            {input.order === 1 ? undefined : <MoveUp onClick={moveUp} />}
                            {input.order === orderMax ? undefined : <MoveDown onClick={moveDown} />}
                            <span>Champ DSN : {input.label}</span>
                        </div>
                    </div>
                    : undefined




    )


}

