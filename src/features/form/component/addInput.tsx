"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
    Calculator,
    Sigma,
    AlignJustify,
    Settings,
    CalendarDays,
    Text,
    FormInput
} from "lucide-react"
import CreateInput from "@/src/features/form/component/createInput"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"

export type Component = {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
    status: string,
    softwareId: string,
    Standard_Composant_Input: {
        id: string,
        type: string,
        label: string,
        maxLength?: number,
        minLength?: number,
        required: boolean,
        readonly: boolean,
        createdAt: Date,
        updatedAt: Date,
    }[]
}

export default function AddInputToComponent({ component }: { component: Component }) {
    const [commandIsVisible, setCommandIsVisible] = React.useState(false)
    const [formIsActive, setFormIsActive] = React.useState(false)
    const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
        if (event.key === '/') {
            setCommandIsVisible(() => true)
        }
    }
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event.target)
        setCommandIsVisible(() => false)
    }
    return (
        <>
            <div className="py-2">
                <h1 className="text-2xl font-bold">{component.title}</h1>
                <h2>{component.description}</h2>
            </div>

            <div>
                <Table>
                    <TableCaption>Liste des champs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead>Label</TableHead>
                            <TableHead>Requis</TableHead>
                            <TableHead>Lecture seul</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {component.Standard_Composant_Input.map((input) => (


                            <TableRow key={input.id}>
                                <TableCell className="font-medium">{input.type}</TableCell>
                                <TableCell>{input.label}</TableCell>
                                <TableCell>{input.required ? <Badge variant="default">Oui</Badge> : <Badge variant="secondary">Non</Badge>}</TableCell>
                                <TableCell>{input.readonly ? <Badge variant="default">Oui</Badge> : <Badge variant="secondary">Non</Badge>}</TableCell>
                            </TableRow>
                        ))}


                    </TableBody>

                </Table>

            </div>

            <div className="py-2">
                {commandIsVisible ?
                    (
                        <div>
                            <Command onClick={handleClick} className="rounded-lg border shadow-md">
                                <CommandInput placeholder="Ajouter un bloc formulaire" />
                                <CommandList>
                                    <CommandEmpty>Pas de résultat.</CommandEmpty>
                                    <CommandGroup heading="Champ texte et nombre">
                                        <CommandItem>
                                            <Text className="mr-2 h-4 w-4" />
                                            <span onClick={() => setFormIsActive(true)}>Champ texte</span>
                                        </CommandItem>
                                        <CommandItem>
                                            <Sigma className="mr-2 h-4 w-4" />
                                            <span>Champ numérique</span>
                                        </CommandItem>
                                        <CommandItem>
                                            <CalendarDays className="mr-2 h-4 w-4" />
                                            <span>Champ date</span>
                                        </CommandItem>
                                        <CommandItem>
                                            <Calculator className="mr-2 h-4 w-4" />
                                            <span>Champ range</span>
                                        </CommandItem>
                                        <CommandItem>
                                            <FormInput className="mr-2 h-4 w-4" />
                                            <span>Fichier</span>
                                            <CommandShortcut>⌘P</CommandShortcut>
                                        </CommandItem>
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

                    ) : formIsActive ? <CreateInput type="text" composantId={component.id} setFormIsActive={setFormIsActive} /> : <Input placeholder="Utiliser la touche / pour ajouter un bloc" type="text" onKeyDown={handleKeyDown} />

                }
            </div>
        </>
    )
}