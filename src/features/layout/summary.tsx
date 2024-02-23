import { getChapterBook } from "@/src/query/software_book.query";
import Link from "next/link";
export default function Summary({ chapters }: { chapters: getChapterBook[] }) {
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
        level_2.filter(level2 => level2.parentId === level.id)
    )
    const getChildLevel2 = level_2.map(level2 =>
        level_3.filter(level3 => level3.parentId === level2.id)
    )
    const merge = level_1.map((level_1) => {
        return {
            ...level_1,
            child: getChildLevel1.map(level => level.filter(child => child.parentId === level_1.id))
        }
    })
    console.log('render')
    return (
        <div className="fixed left-0 p-4 border-r border-b-accent h-full ">
            <ul>
                {merge.map(chapters => {
                    return (
                        <>
                            < li key={chapters.id} ><Link href={`/editor/book/${chapters.bookId}/chapter/${chapters.id}`}>{`${chapters.level_1}.${chapters.label}`}</Link></li>
                            {chapters.child.map(children =>
                                <li key={Math.random()}>
                                    <ul className="ml-2">
                                        {children.map(child =>
                                            <li key={`${child.level_1}.${child.level_2}.${child.label}`}><Link href={`/editor/book/${child.bookId}/chapter/${child.id}`}>{`${child.level_1}.${child.level_2}.${child.label}`}</Link></li>
                                        )}
                                    </ul>
                                </li>
                            )}
                        </>

                    )


                })}
            </ul >

        </div>
    )
}