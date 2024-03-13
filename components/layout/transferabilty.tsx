"use client";
import React, { useEffect } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { createAssociationChapterStandardComposant } from "@/src/features/actions/chapterStdComponent/chapterStdComponent.actions";
import { set } from "date-fns";
export function Transferabilty({ availableValues, useValues, chapterSlug, clientSlug }: { availableValues: string[], useValues: string[], chapterSlug: string, clientSlug: string }) {
    const [donesList, setDonesList] = React.useState<string[]>(useValues)
    const [todoList, availables] =
        useDragAndDrop<HTMLUListElement, string>(
            availableValues,
            {
                group: "todoList"
            }
        );
    const [doneList, dones] =
        useDragAndDrop<HTMLUListElement, string>(
            useValues,
            {
                group: "todoList"
            }
        );

    useEffect(() => {
        const difference = dones.filter(x => !donesList.includes(x));
        console.log(difference)
        const save = async () => {
            const action = await createAssociationChapterStandardComposant({
                chapterSlug: chapterSlug,
                standardComposantLabel: difference[0] ?? "",
                clientSlug: clientSlug
            })
            if (action.serverError) {
                console.log(action.serverError)
            }
        }
        save()
        setDonesList(dones)

    }, [dones, donesList, chapterSlug, clientSlug])
    return (
        <div className="flex h-full flex-col justify-between lg:flex-row" >
            <div className="h-1/2">
                <span>Composant disponible</span>
                <ul ref={
                    todoList}>
                    {availables.map((available) => (
                        // eslint-disable-next-line tailwindcss/no-custom-classname
                        <li className="kanban-item"
                            key={available}>
                            {available}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-1/2">
                <span>Composant du chapitre</span>
                <ul className="border" ref={doneList}>
                    {
                        dones.map((done) => (
                            // eslint-disable-next-line tailwindcss/no-custom-classname
                            <li className="kanban-item"
                                key={done}>
                                {done}
                            </li>
                        ))}
                </ul>
            </div>

        </div>
    );
}