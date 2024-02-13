"use client";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { createTextArea, editTextArea } from "@/src/features/actions/reactQuill/reactQuill.actions"
import type { getTextAreaByIdType } from "@/src/helpers/type"

export const CreateReactQuill = ({ componentId }: { componentId: string }) => {
    const [value, setValue] = useState('');
    const createTextAreaId = createTextArea.bind(null, componentId);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createTextAreaId(value)
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

export function EditTextArea({ textarea }: { textarea: getTextAreaByIdType }) {
    const [value, setValue] = useState(textarea.value ? textarea.value : '');
    const editTextAreaId = editTextArea.bind(null, textarea.id);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await editTextAreaId(value)
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