import Link from "next/link";
import type { getChapterByBookSlug } from "@/src/query/project_book.query"
import { Printer, CornerDownLeft, TicketCheck } from "lucide-react";
export default function Summary({ chapters, clientSlug, projectSlug, bookSlug }: { chapters: getChapterByBookSlug, clientSlug: string, projectSlug: string, bookSlug: string }) {

    const level_1 = chapters.filter(chapter =>
        chapter.level_1 >= 1 && chapter.level_2 === 0 && chapter.level_3 === 0
    )
    const level_2 = chapters.filter(chapter =>
        chapter.level_1 >= 1 && chapter.level_2 >= 1 && chapter.level_3 === 0
    )
    const level_3 = chapters.filter(chapter =>
        chapter.level_1 >= 1 && chapter.level_2 >= 1 && chapter.level_3 >= 1
    )
    const getChildLevel1 = level_1.map(level =>
        level_2.filter(level2 => level2.level_1 === level.level_1)
    )
    const getChildLevel2 = level_2.map(level2 =>
        level_3.filter(level3 => level3.level_2 === level2.level_2)
    )
    const merge = level_1.map((level_1) => {
        return {
            ...level_1,
            child: getChildLevel1.map(level => level.filter(child => child.level_1 === level_1.level_1))
        }
    })
    return (
        <div className="lg:h-full border-r-2 flex flex-col">
            <ul className="h-3/4">
                {merge.map(chapters => {
                    return (
                        <>
                            < li key={`${chapters.level_1}.${chapters.level_2}.${chapters.level_3} ${chapters.label}`} ><Link href={`#${chapters.level_1}.${chapters.level_2}.${chapters.level_3}`}>{`${chapters.level_1}.${chapters.label}`}</Link></li>
                            {chapters.child.map(children =>
                                <li key={Math.random()}>
                                    <ul className="ml-2">
                                        {children.map(child =>
                                            < li key={`${chapters.level_1}.${chapters.level_2}.${chapters.level_3} ${chapters.label}`} ><Link href={`/#{${chapters.level_1}.${chapters.level_2}.${chapters.level_3}`}>{`${chapters.level_1}.${chapters.label}`}</Link></li>
                                        )}
                                    </ul>
                                </li>
                            )}
                        </>

                    )


                })}


            </ul>
            <ul className="h-1/4 w-full">
                <li className="flex flex-row w-full">
                    <Printer /><Link className="ml-2" href={`/client/${clientSlug}/project/${projectSlug}/book/${bookSlug}/pdf`}>Imprimer en pdf</Link>
                </li>
                <li className="flex flex-row w-full">
                    <CornerDownLeft /><Link className="ml-2" href={`/client/${clientSlug}/project/${projectSlug}/book`}>Retour à la liste des cahiers</Link>
                </li>
                <li className="flex flex-row w-full">
                    <TicketCheck /><Link className="ml-2" href={`/client/${clientSlug}/project/${projectSlug}/book/${bookSlug}/validation`}>Valider le cahier</Link>
                </li>
            </ul>
        </div>

    )
}