"use client";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { createTextArea, editTextArea } from "@/src/features/actions/reactQuill/reactQuill.actions"
import type { getTextAreaByComponentSlug } from "@/src/query/sofwtare_textArea";
import type { getStdComponentBySlug } from "@/src/query/software_component.query"

export const CreateReactQuill = ({ componentSlug, clientSlug }: { componentSlug: string, clientSlug: string }) => {
    const [value, setValue] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createTextArea({
                value,
                clientSlug,
                componentSlug
            })
        } catch (err) {
            console.error(err)
            throw new Error('Une erreur est survenue lors de la création du texte')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <Button type="submit">Enregistrer</Button>
        </form>
    )
}

export function EditTextArea({ textarea, clientSlug, componentSlug, stdComponent }: { textarea: getTextAreaByComponentSlug, clientSlug: string, componentSlug: string, stdComponent: getStdComponentBySlug }) {
    const [value, setValue] = useState(textarea.value ? textarea.value : '');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await editTextArea({
                value,
                clientSlug,
                componentSlug
            })
        } catch (err) {
            console.error(err)
            throw new Error('Une erreur est survenue lors de la création du texte')
        }
    }
    return (
        <div>
            <div>
                <h1 className="font-extrabold">{stdComponent.label}</h1>
                <p className="mt-2">{stdComponent.description}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <ReactQuill theme="snow" value={value} onChange={setValue} />
                <Button type="submit">Enregistrer</Button>

            </form>
        </div>


    )

}