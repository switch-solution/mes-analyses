"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { getStdInputsByStdComponentSlug } from "@/src/query/sofwtare_component_input.query"
import type { getStdComponentBySlug } from "@/src/query/software_component.query"
import { Draggable } from "@/components/layout/draggable";
export default function DynamicForm({ clientSlug, componentSlug, inputs, stdComponent }: { clientSlug: string, componentSlug: string, inputs: getStdInputsByStdComponentSlug, stdComponent: getStdComponentBySlug }) {
    return (
        <div className="flex size-full flex-col">
            <div>
                <h1 className="font-extrabold">{stdComponent.label}</h1>
                <p className="mt-2">{stdComponent.description}</p>
            </div>
            <Draggable inputs={inputs} clientSlug={clientSlug} componentSlug={componentSlug} />

            <div className="flex w-full flex-row">
                <Link href={`/client/${clientSlug}/editor/component/${componentSlug}/input/create`}><Button>Ajouter un nouveau champ</Button></Link>

            </div>


        </div>

    )
}

