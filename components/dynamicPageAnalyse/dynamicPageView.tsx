"use client";
import DynamicPageViewBlock from "@/components/dynamicPageAnalyse/dynamicPageViewBlock";
import DynamicPageForm from "@/components/dynamicPageAnalyse/dynamicPageForm";
import { Button } from "@/components/ui/button";
import { createForm } from "@/src/features/actions/page/page.actions";
import { toast } from "sonner"

export default function DynamicPageView({
    clientSlug,
    label,
    internalId,
    projectSlug,
    pageSlug,
    blocks,
    datas,
    options

}: {
    clientSlug: string,
    label: string,
    internalId: string,
    pageSlug: string,
    projectSlug: string,
    blocks: {
        id: string,
        pageId: string,
        type: string,
        label: string,
        slug: string,
        level1: boolean,
        min: number,
        max: number,
        minLength: number,
        maxLength: number,
        required: boolean,
        readonly: boolean,
        buttonLabel?: string | null | undefined,
        blockMasterId?: string | null | undefined
        htmlElement: string,
        Project_Block_Value: {
            blockId: string,
            formId: string,
        }[]
    }[],
    datas: {
        formGroup: string,
        formId: string,
        formTitle: string,
        data: {
            id: string,
            label: string,
            projectLabel: string,
            softwareLabel: string,
            clientId: string,
            blockId: string,
            formId: string,
            blockVersion: number,
            value: string,
            formGroup: string,
            createdAt: Date,
            updatedAt: Date,
            createdBy: string
        }[]

    }[],
    options?: {
        label: string,
        htmlElement: string,
        blockMasterId: string,
    }[]
}) {
    const handleClick = async (formId: string) => {
        const action = await createForm({
            clientSlug: clientSlug,
            projectSlug: projectSlug,
            pageSlug: pageSlug,
            formId: formId,

        })
        if (action?.serverError) {
            toast.error(`${action.serverError}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        } else {
            toast.success(`Création du formulaire`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        }
    }

    return (
        <div className="flex w-full flex-col justify-center">
            <h1>Page {internalId} {label}</h1>
            {blocks.map((block) => (
                <div key={block.id}>
                    {block.level1 && <DynamicPageViewBlock
                        clientSlug={clientSlug}
                        blockSlug={block.slug}
                        pageSlug={pageSlug}
                        label={block.label}
                        htmlElement={block.htmlElement} />
                    }
                    {block.htmlElement === 'form' && (
                        < div className="ml-4 mt-2">
                            {datas.filter(data => data.formId === block.id).map((formGroup) => {
                                const datas = formGroup.data.filter(data => data.formGroup === formGroup.formGroup)
                                return (
                                    <div key={formGroup.formGroup} className="mt-2">
                                        < DynamicPageForm
                                            clientSlug={clientSlug}
                                            projectSlug={projectSlug}
                                            pageSlug={pageSlug}
                                            formTitle={formGroup.formTitle ? formGroup.formTitle : 'Edition'}
                                            blockSlug={block.slug}
                                            formId={block.id}
                                            fields={blocks.filter(input => input.blockMasterId === block.id).map(input => {
                                                return ({
                                                    min: input.min,
                                                    max: input.max,
                                                    minLenght: input.minLength,
                                                    maxLenght: input.maxLength,
                                                    label: input.label,
                                                    type: input.type,
                                                    required: input.required,
                                                    htmlElement: input.htmlElement,
                                                    blockMasterId: input.blockMasterId ? input.blockMasterId : null

                                                })
                                            })}
                                            datas={datas}
                                            formGroup={formGroup.formGroup}
                                            options={options}
                                        />

                                    </div>
                                )

                            })}
                            {block.htmlElement === 'form' && <Button onClick={(event) => { handleClick(block.id); }}>{block.buttonLabel ? block.buttonLabel : 'Ajouter une nouvelle valeur'}</Button>}

                        </div >

                    )}

                    {block.htmlElement === 'ul' && (
                        < div className="ml-4">
                            <ul>
                                {blocks.filter(input => input.blockMasterId === block.id).map((input) => (
                                    <DynamicPageViewBlock key={input.id}
                                        clientSlug={clientSlug}
                                        blockSlug={input.slug}
                                        pageSlug={pageSlug}
                                        label={input.label}
                                        htmlElement={input.htmlElement}
                                    />))}

                            </ul>

                        </div >

                    )}

                </div>

            ))
            }


        </div >
    );
}