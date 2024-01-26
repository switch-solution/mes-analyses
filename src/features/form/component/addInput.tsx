"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import DisplayInput from "../../formBuilder/DisplayInput";
import {
    Calculator,
    AlignJustify,
    Settings,
    CalendarDays,
    Text,
    FormInput,
    FileImage,
    Rows4
} from "lucide-react"
import CreateInput from "@/src/features/form/component/createInput"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
export type Component = {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
    status: string,
    softwareId: string,
    Standard_Composant_Input: Standard_Composant_Input[]
}

export type Standard_Composant_Input = {
    id: string,
    type: string,
    label: string,
    maxLength?: number,
    minLength?: number,
    required: boolean,
    readonly: boolean,
    createdAt: Date,
    updatedAt: Date,
    order: number,
}

type StandardInput = {
    name: string,
    type: string,
    label: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
}

export default function AddInputToComponent({ component, stdInput, nextOrder }: { component: Component, stdInput: StandardInput[], nextOrder: number }) {
    const [commandIsVisible, setCommandIsVisible] = React.useState(false)
    const [formIsActive, setFormIsActive] = React.useState(false)
    const [typeInput, setTypeInput] = React.useState<'text' | 'number' | 'date' | 'file'>('text')
    const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
        if (event.key === '/') {
            setCommandIsVisible(() => true)
        }
    }
    const handleClick = () => {
        setCommandIsVisible(() => false)
    }
    const handleClickCommand = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setFormIsActive(true)
        setTypeInput(event.currentTarget.getAttribute('datatype') ? event.currentTarget.getAttribute('datatype') : 'text')
    }
    return (
        <>
            <div className="py-2">
                <h1 className="text-2xl font-bold">{component.title}</h1>
                <h2>{component.description}</h2>
            </div>

            <div className="py-2">
                {component.Standard_Composant_Input.map((input) => (
                    <DisplayInput key={input.id} input={input} orderMax={nextOrder - 1} />

                ))}

            </div>

            <div className="py-2">
                {commandIsVisible ?
                    (
                        <div>
                            <Command onClick={handleClick} className="rounded-lg border shadow-md">
                                <CommandInput placeholder="Ajouter un bloc formulaire" />
                                <CommandList>
                                    <CommandEmpty>Pas de résultat.</CommandEmpty>
                                    <CommandGroup heading="Nature du champ">
                                        {stdInput.map((input) => (
                                            <CommandItem key={input.type}>
                                                {input.type === 'text' ? <Text /> :
                                                    input.type === "number" ? <Calculator /> :
                                                        input.type === "date" ? <CalendarDays /> :
                                                            input.type === "textarea" ? <FormInput /> :
                                                                input.type === "Image" ? <FileImage /> :
                                                                    input.type === "select" ? <Rows4 /> : null
                                                }
                                                <span onClick={handleClickCommand} datatype={input.type} >{input.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    <CommandSeparator />
                                    <CommandGroup heading="Zone spécial">
                                        <CommandItem>
                                            <AlignJustify className="mr-2 h-4 w-4" />
                                            <span>Zone de texte</span>
                                            <CommandShortcut>⌘B</CommandShortcut>
                                        </CommandItem>
                                        <CommandItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>DSN</span>
                                            <CommandShortcut>⌘S</CommandShortcut>
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>

                    ) : formIsActive ? <CreateInput type={typeInput} composantId={component.id} setFormIsActive={setFormIsActive} order={nextOrder} /> : <Input placeholder="Utiliser la touche / pour ajouter un bloc" type="text" onKeyDown={handleKeyDown} />

                }
            </div>
        </>
    )
}