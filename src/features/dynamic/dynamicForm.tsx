"use client";
import type { getStandardInputByComponentIdType } from "@/src/helpers/type"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { createValues } from "../actions/dynamic/dynamic.actions";
export default function DynamicForm({ componentId, inputs }: { componentId: string, inputs: getStandardInputByComponentIdType[] }) {
    const createValuesWithId = createValues.bind(null, componentId);
    return (
        <form action={createValuesWithId}>
            {inputs.map((input) =>
                <div key={input.id}>
                    <Label htmlFor={input.id}>{input.label}</Label>
                    <Input id={input.id} name={input.id} aria-label={input.label} type={input.type} />
                </div>


            )}
            <Button aria-label="Enregistrer" type="submit">Enregistrer</Button>
        </form >


    )
}