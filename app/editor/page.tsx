import { userIsEditor } from "@/src/query/security.query";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth"
import { getCountMyBookEditable, getCountMySoftwareItemsEditable, getCountAttachmentEditable } from "@/src/query/editor.query";
import { countStdComponent } from "@/src/query/stdcomponent.query";
import CardWithOptions from "@/src/features/layout/cardWithOptions";
import Container from "@/src/features/layout/container";
import { createEvent } from "@/src/query/logger.query";
import type { Event } from "@/src/helpers/type";
export default async function Page() {
    const session = await getAuthSession()
    if (!session?.user?.id) return redirect('/home')
    const isEditor = await userIsEditor();
    if (!isEditor) return redirect('/home')
    const countBooks = await getCountMyBookEditable()
    const countComponents = await countStdComponent()
    const countMySoftwareItems = await getCountMySoftwareItemsEditable()
    const countAttachment = await getCountAttachmentEditable()
    const event: Event = {
        scope: 'editor',
        level: 'info',
        message: 'Accès à la page editor/page',
    }
    await createEvent(event)
    return (<Container>
        <CardWithOptions titre="Cahiers" content={countBooks} href="/editor/book" />
        <CardWithOptions titre="Composants" content={countComponents} href="/editor/component" />
        <CardWithOptions titre="PJ" content={countAttachment} href="/editor/attachment" />
        <CardWithOptions titre="Rubriques" content={countMySoftwareItems} href="/editor/item" />
        <CardWithOptions titre="CCN" content={countComponents} href="/editor/component" />
        <CardWithOptions titre="Maintien des salaires" content={countComponents} href="/editor/component" />

    </Container>)
}