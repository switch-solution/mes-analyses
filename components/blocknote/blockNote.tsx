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
import { createBlockNote } from "@/src/features/actions/blockNote/blockNote.actions";
import { createBlockNoteSchema } from '@/src/helpers/definition';
import { useDebouncedCallback } from 'use-debounce';
import { toast } from "sonner"

// Our <Editor> component we can reuse later
export default function Editor({ clientSlug, values }: { clientSlug: string, values?: string }) {
    // Stores the document JSON.
    const [blocks, setBlocks] = useState<Block[]>([]);
    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        initialContent: values ? JSON.parse(values) : [{
            type: "paragraph",
            content: "Créer votre texte !",
        },]
    });
    const handleChange = useDebouncedCallback(async (blocks: string) => {
        try {
            const datas: z.infer<typeof createBlockNoteSchema> = {
                blocks,
                clientSlug
            }
            const action = await createBlockNote(datas)
            if (action?.serverError) {
                console.error(action.serverError)
                toast(`${action.serverError}`, {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                })
            } else {
                toast(`Sauvegarde effectué`, {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                })
            }
        } catch (err) {
            console.error(err)
        }
    }, 300)
    // Renders the editor instance and its document JSON.
    return (
        // eslint-disable-next-line tailwindcss/no-custom-classname
        <div className={"wrapper"}>
            <div>Editeur de texte:</div>
            <div className={"item"}>
                <BlockNoteView
                    editor={editor}
                    onChange={() => {
                        handleChange(JSON.stringify(editor.document))
                    }}
                />
            </div>
        </div>
    );
}