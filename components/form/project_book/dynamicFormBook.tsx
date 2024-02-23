"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"

import type { getInputByProjectSlug } from "@/src/query/projectInput.query"

export default function DynamicFormBook({ clientSlug, projectSlug, inputs, }: { clientSlug: string, projectSlug: string, inputs: getInputByProjectSlug }) {


    return (
        <div className="flex flex-col w-full h-full">
            <div>
                <h1 className="font-extrabold">Société</h1>
                <p className="mt-2">Liste des sociétés</p>
            </div>
            <form className="m-2 w-full">
                {inputs.map((input) =>
                    input.type === 'text' || input.type === 'number' || input.type === 'date' ?
                        <div key={input.label} className="flex flex-row items-center w-full justify-between mt-2">
                            <Label htmlFor={input.label}>{input.label}</Label>
                            <Input id={input.label} name={input.label} aria-label={input.label} type={input.type} minLength={input.minLength ? input.minLength : undefined} maxLength={input?.maxLength ? input.maxLength : undefined} defaultValue={input.Project_Value.at(0)?.textValue ? input.Project_Value.at(0)?.textValue : ""} />
                        </div> : undefined

                )}
            </form >



        </div>

    )
}

