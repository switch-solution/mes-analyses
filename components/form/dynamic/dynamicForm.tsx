"use client";
import { useState } from "react";
import { Plus } from 'lucide-react';
import CreateStdInput from "@/components/form/software_ComponentInput/create";
import type { getStdInputsByStdComponentSlug } from "@/src/query/sofwtare_component_input.query"
import type { getStdComponentBySlug } from "@/src/query/software_component.query"
import { Draggable } from "@/components/layout/draggable";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
export default function DynamicForm({ clientSlug, componentSlug, inputs, stdComponent }: { clientSlug: string, componentSlug: string, inputs: getStdInputsByStdComponentSlug, stdComponent: getStdComponentBySlug }) {
    const [command, setCommand] = useState<boolean>(false)
    const [inputType, setInputType] = useState<string | undefined>()
    return (
        <div className="flex flex-col w-full h-full">
            <div>
                <h1 className="font-extrabold">{stdComponent.label}</h1>
                <p className="mt-2">{stdComponent.description}</p>
            </div>
            <Draggable inputs={inputs} clientSlug={clientSlug} componentSlug={componentSlug} />

            <div className="flex flex-row w-full">
                {command && !inputType ?
                    <Command>
                        <CommandInput placeholder="text" />
                        <CommandList>
                            <CommandEmpty>Liste des champs.</CommandEmpty>
                            <CommandGroup heading="Zone de base">
                                <CommandItem onSelect={() => setInputType('text')}>Texte</CommandItem>
                                <CommandItem onSelect={() => setInputType('number')}>Numérique</CommandItem>
                                <CommandItem onSelect={() => setInputType('date')}>Date</CommandItem>
                                <CommandItem onSelect={() => setInputType('select')}>Liste déroulante</CommandItem>
                                <CommandItem onSelect={() => setInputType('switch')}>Boite à cocher</CommandItem>
                            </CommandGroup>

                        </CommandList>
                    </Command> :
                    command && inputType ?
                        <CreateStdInput clientSlug={clientSlug} componentSlug={componentSlug} type={inputType} setInputType={setInputType} setCommand={setCommand} />
                        :
                        <span className="flex flex-row"><Plus onClick={() => setCommand(true)} />Ajouter un champ</span>

                }
            </div>


        </div>

    )
}

