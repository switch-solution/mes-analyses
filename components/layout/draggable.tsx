"use client";
import React from "react";
import Link from "next/link";
import type { getStdInputsByStdComponentSlug } from "@/src/query/sofwtare_component_input.query"
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import DeleteStdInput from "@/components/form/software_Input/delete";
import DynamicSelect from "../dynamic/dynamicSelect";
import { SquarePen } from "lucide-react";

export function Draggable({ inputs, clientSlug, componentSlug }: { inputs: getStdInputsByStdComponentSlug, clientSlug: string, componentSlug: string }) {
    const inputsLabel = inputs.map(input => input.label)
    const [parent, inputsLabelList] =
        useDragAndDrop<HTMLUListElement, string>(
            inputsLabel,
            {
                draggable: (el) => {
                    return el.id !== "no-drag";
                },
            }
        );

    return (
        <ul ref={parent}>
            {inputsLabelList.map((input) => {
                const inputParam = inputs.find(inputParam => inputParam.label === input)
                if (inputParam?.type === 'text' || inputParam?.type === 'number' || inputParam?.type === 'date') {
                    return (
                        <li className="mt-2 flex w-full flex-row items-center justify-between" data-label={input} key={inputParam.id}>
                            <Link href={`/client/${clientSlug}/editor/component/${componentSlug}/input/${inputParam.id}/edit`}><SquarePen /></Link>
                            <DeleteStdInput key={input} clientSlug={clientSlug} componentSlug={componentSlug} id={inputParam.id} />
                            <Label className="w-1/4" htmlFor={inputParam.id}>{input}</Label>
                            <Input className="w-1/2" id={inputParam.id} name={inputParam.id} aria-label={inputParam.label} type={inputParam.type} minLength={inputParam.minLength ? inputParam.minLength : undefined} maxLength={inputParam?.maxLength ? inputParam.maxLength : undefined} defaultValue={inputParam.defaultValue ? inputParam.defaultValue : ""} placeholder={inputParam.placeholder ? inputParam.placeholder : ""} />
                        </li>)
                }
                if (inputParam?.type === 'select') {
                    return (
                        <li className="mt-2 flex w-full flex-row items-center justify-between" key={inputParam.id}>
                            <Link href={`/client/${clientSlug}/editor/component/${componentSlug}/input/${inputParam.id}/edit`}><SquarePen /></Link>
                            <DeleteStdInput key={input} clientSlug={clientSlug} componentSlug={componentSlug} id={inputParam.id} />
                            <Label className="w-1/4" htmlFor={inputParam.id}>{input}</Label>

                            <DynamicSelect key={inputParam.id} placeholder={inputParam.placeholder} label={inputParam.label} options={inputParam.Software_Component_Select_Option} />

                        </li>)
                }
                return (
                    undefined
                )
            })}
            <div
                id="no-drag">Impossible de réaliser le drag and drop</div>
        </ul>
    );
}