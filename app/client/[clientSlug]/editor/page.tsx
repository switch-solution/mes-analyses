import { userIsEditor } from "@/src/query/security.query";
import { getEditorHome } from "@/src/query/editor.query";
import CardWithOptions from "@/src/features/layout/cardWithOptions";
import Container from "@/src/features/layout/container";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const { countAttachment, countItems, countBook, countStdComponent, countConstantSoftware, countSetting } = await getEditorHome(params.clientSlug)

    return (<Container>
        <CardWithOptions titre="Cahiers" content={countBook} href={`/client/${params.clientSlug}/editor/book`} />
        <CardWithOptions titre="Composants" content={countStdComponent} href={`/client/${params.clientSlug}/editor/component`} />
        <CardWithOptions titre="PJ" content={countAttachment} href={`/client/${params.clientSlug}/editor/attachment`} />
        <CardWithOptions titre="Rubriques" content={countItems} href={`/client/${params.clientSlug}/editor/item`} />
        <CardWithOptions titre="CCN" content={countStdComponent} href={`/client/${params.clientSlug}/editor/ccn`} />
        <CardWithOptions titre="Maintien des salaires" content={countStdComponent} href={`/client/${params.clientSlug}/editor/attachment`} />
        <CardWithOptions titre="Constantes" content={countConstantSoftware} href={`/client/${params.clientSlug}/editor/constant`} />
        <CardWithOptions titre="Paramétres" content={countSetting} href={`/client/${params.clientSlug}/editor/setting`} />

    </Container>)
}