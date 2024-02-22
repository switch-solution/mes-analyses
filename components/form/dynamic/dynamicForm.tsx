"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import { Plus } from 'lucide-react';
import CreateStdInput from "@/components/form/stdComponentInput/create";
import DeleteStdInput from "@/components/form/stdComponentInput/delete";
import type { getStdInputsByStdComponentSlug } from "@/src/query/stdComponentInput.query"
import type { getStdComponentBySlug } from "@/src/query/stdcomponent.query"
import Link from "next/link";

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
            <form className="m-2 w-full">
                {inputs.map((input) =>
                    input.type === 'text' || input.type === 'number' || input.type === 'date' ?
                        <div key={input.id} className="flex flex-row items-center w-full justify-between mt-2">
                            <DeleteStdInput key={input.id} clientSlug={clientSlug} componentSlug={componentSlug} id={input.id} />
                            <Link href={`/client/${clientSlug}/editor/component/${componentSlug}/input/${input.id}/edit`}><SquarePen /></Link>
                            <Label htmlFor={input.id}>{input.label}</Label>
                            <Input id={input.id} name={input.id} aria-label={input.label} type={input.type} minLength={input.minLength ? input.minLength : undefined} maxLength={input?.maxLength ? input.maxLength : undefined} defaultValue={input.defaultValue ? input.defaultValue : ""} placeholder={input.placeholder ? input.placeholder : ""} />
                        </div> :
                        input.type === 'switch' ?
                            <div key={input.id} className="flex items-center space-x-2">
                                <Switch id={input.id} />
                                <Label htmlFor={input.id}>{input.label}</Label>
                            </div>
                            :
                            input.type.slice(0, 3) === 'dsn' ?
                                <div key={input.id}>
                                    <Label htmlFor={input.id}>{input.label}</Label>
                                    <Input id={input.id} name={input.id} aria-label={input.label} type='text' minLength={input.minLength ? input.minLength : undefined} maxLength={input?.maxLength ? input.maxLength : undefined} />
                                </div>
                                : undefined
                )}
            </form >

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

