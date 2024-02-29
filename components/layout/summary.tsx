import Link from "next/link";
import type { getChapterByBookSlug } from "@/src/query/project_book.query"
import { Button } from "@/components/ui/button";
export default function Summary({ chapters }: { chapters: getChapterByBookSlug }) {

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
        <div className="h-full border-r-2">

            <ul>
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
                <li>
                    <Button>Valider le cahier</Button>
                </li>
            </ul >
        </div>

    )
}