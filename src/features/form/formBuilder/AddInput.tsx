"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import DisplayInput from "@/src/features/form/formBuilder/DisplayInput";
import type { InputStandardType } from "@/src/helpers/type"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    Calculator,
    CalendarDays,
    Text,
    FormInput,
    FileImage,
    Rows4,
    ToggleRight
} from "lucide-react"
import CreateInput from "@/src/features/form/formBuilder/CreateInput"
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
    clientId: string,
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
    maxLength: number | null,
    minLength: number | null,
    maxValue: number | null,
    minValue: number | null,
    placeholder: string | null,
    order: number,
    defaultValue: string | null,
    required: boolean,
    readonly: boolean,
    multiple: boolean | null,
    textArea: string | null,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
    standard_ComposantId: string,
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

    const [typeInput, setTypeInput] = React.useState<InputStandardType>()
    const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
        if (event.key === '/') {
            setCommandIsVisible(() => true)
        }
    }
    const handleClick = () => {
        if (typeInput) {
            setCommandIsVisible(() => false)

        }
    }
    const handleClickCommand = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        console.log(event.currentTarget.getAttribute('datatype'))
        setFormIsActive(true)
        setTypeInput(event.currentTarget.getAttribute('datatype') as InputStandardType || 'text');
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
                                        {stdInput.filter(exludeDSn => exludeDSn.type.slice(0, 3) != "dsn").map((input) => (
                                            <CommandItem key={input.type}>

                                                {input.type === 'text' ? <Text className="mr-2" /> :
                                                    input.type === "number" ? <Calculator className="mr-2" /> :
                                                        input.type === "date" ? <CalendarDays className="mr-2" /> :
                                                            input.type === "textArea" ? <FormInput className="mr-2" /> :
                                                                input.type === "Image" ? <FileImage className="mr-2" /> :
                                                                    input.type === "select" ? <Rows4 className="mr-2" /> :
                                                                        input.type === "switch" ? <ToggleRight className="mr-2" /> : null
                                                }
                                                <span onClick={handleClickCommand} datatype={input.type} >{input.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    <CommandSeparator />
                                    <CommandGroup heading="DSN information société">
                                        {stdInput.filter(exludeDSn => exludeDSn.type.slice(0, 10) === "dsnSociety").map((input) => (
                                            <CommandItem key={input.type}>
                                                <span onClick={handleClickCommand} datatype={input.type} >{input.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    <CommandSeparator />
                                    <CommandGroup heading="DSN information établissement">
                                        {stdInput.filter(exludeDSn => exludeDSn.type.slice(0, 16) === "dsnEstablishment").map((input) => (
                                            <CommandItem key={input.type}>
                                                <span onClick={handleClickCommand} datatype={input.type} >{input.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>

                    ) : formIsActive && typeInput ? <CreateInput type={typeInput} composantId={component.id} setFormIsActive={setFormIsActive} order={nextOrder} /> : <Input placeholder="Utiliser la touche / pour ajouter un bloc" type="text" onKeyDown={handleKeyDown} />

                }
            </div >
        </>
    )
}

const InputInfo = ({ input }: { input: Standard_Composant_Input }) => {
    return (
        <>
            <div className="flex items-center space-x-2">
                <Switch id="readOnly" checked={input.readonly} disabled />
                <Label htmlFor="readOnly">Champ en lecture seul</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Switch id="required" checked={input.required} disabled />
                <Label htmlFor="required">Champ requis</Label>
            </div>
        </>


    )
}