/* eslint-disable tailwindcss/no-custom-classname */
"use client"; // this registers <Editor> as a Client Component
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { useState } from "react";
import "@blocknote/react/style.css";
import "@blocknote/core/fonts/inter.css";
import { Block } from "@blocknote/core";
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { createBlockNote } from "@/src/features/actions/blockNote/blockNote.actions";
import { createBlockNoteSchema } from '@/src/helpers/definition';

// Our <Editor> component we can reuse later
export default function Editor({ clientSlug, componentSlug, values }: { clientSlug: string, componentSlug: string, values?: string }) {
    // Stores the document JSON.
    const [blocks, setBlocks] = useState<Block[]>([]);
    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        initialContent: values ? JSON.parse(values) : [{
            type: "paragraph",
            content: "Créer votre texte !",
        },]
    });
    const handleClick = async () => {
        try {
            const data: z.infer<typeof createBlockNoteSchema> = {
                clientSlug,
                componentSlug,
                value: JSON.stringify(blocks),
            }
            const action = await createBlockNote(data)
            if (action?.serverError) {
                console.error(action.serverError)
            }
        } catch (err) {
            console.error(err)
        }
    }
    // Renders the editor instance and its document JSON.
    return (
        // eslint-disable-next-line tailwindcss/no-custom-classname
        <div className={"wrapper"}>
            <div>Editeur de texte:</div>
            <div className={"item"}>
                <BlockNoteView
                    editor={editor}
                    onChange={() => {
                        // Saves the document JSON to state.
                        setBlocks(editor.document);
                    }}
                />
            </div>
            <Button onClick={handleClick}>Sauvegarder</Button>
        </div>
    );
}