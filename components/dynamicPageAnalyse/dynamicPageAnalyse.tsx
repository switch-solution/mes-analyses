"use client";
import DynamicPageCommande from "@/components/dynamicPageAnalyse/dynamicPageCommand";
import DynamicPageEditBlock from "@/components/dynamicPageAnalyse/dynamicPageEditBlock";
export default function DynamicPageAnalyse({
    clientSlug,
    label,
    internalId,
    pageSlug,
    blocks,
    softwareSlug,
    forms

}: {
    clientSlug: string,
    label: string,
    internalId: string,
    pageSlug: string,
    softwareSlug: string,
    blocks: {
        id: string,
        pageId: string,
        type: string,
        label: string,
        slug: string,
        level1: boolean
        blockMasterId?: string | null | undefined
        htmlElement: string,

    }[],
    forms: {
        id: string,
        label: string,
        slug: string,
    }[]
}) {
    return (
        <div className="flex w-full flex-col justify-center">
            <h1>Page {internalId} {label}</h1>
            {blocks.map((block) => (
                <div key={block.id}>
                    {block.level1 && <DynamicPageEditBlock
                        clientSlug={clientSlug}
                        blockSlug={block.slug}
                        pageSlug={pageSlug}
                        label={block.label}
                        softwareSlug={softwareSlug}
                        type={block.type} />
                    }
                    {block.htmlElement === 'form' && (
                        <div>
                            < div className="ml-8">
                                {blocks.filter(input => input.blockMasterId === block.id).map((input) => (
                                    <DynamicPageEditBlock
                                        key={input.id}
                                        clientSlug={clientSlug}
                                        blockSlug={input.slug}
                                        pageSlug={pageSlug}
                                        label={input.label}
                                        softwareSlug={softwareSlug}
                                        type={input.type}
                                    />
                                ))}
                            </div >

                        </div>

                    )}

                    {block.htmlElement === 'ul' && (
                        < div className="ml-8">
                            {blocks.filter(input => input.blockMasterId === block.id).map((input) => (
                                <DynamicPageEditBlock key={input.id}
                                    clientSlug={clientSlug}
                                    blockSlug={input.slug}
                                    pageSlug={pageSlug}
                                    label={input.label}
                                    softwareSlug={softwareSlug}
                                    type={input.type}
                                />))}
                        </div >

                    )}



                </div>
            ))
            }

            <DynamicPageCommande key="addBlock" clientSlug={clientSlug} pageSlug={pageSlug} htmlElement='text' softwareSlug={softwareSlug} forms={forms} />
        </div >
    );
}