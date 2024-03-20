"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { getStdInputsByStdComponentSlug } from "@/src/query/sofwtare_component_input.query"
import type { getStdComponentBySlug } from "@/src/query/software_component.query"
import { Draggable } from "@/components/layout/draggable";
import Container from "../layout/container";
export default function DynamicForm({ clientSlug, formSlug, softwareSlug, inputs, stdComponent }: { clientSlug: string, softwareSlug: string, formSlug: string, inputs: getStdInputsByStdComponentSlug, stdComponent: getStdComponentBySlug }) {
    return (
        <Container>
            <div className="flex size-full flex-col">
                <div>
                    <h1 className="font-extrabold">{stdComponent.label}</h1>
                    <p className="mt-2">{stdComponent.description}</p>
                </div>
                <Draggable inputs={inputs} clientSlug={clientSlug} componentSlug={formSlug} />
                <div className="flex w-full flex-row">
                    <Link href={`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}/input/create`}><Button>Ajouter un nouveau champ</Button></Link>
                </div>
            </div>
        </Container>
    )
}

