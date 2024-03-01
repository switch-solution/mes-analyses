import { userIsEditor } from "@/src/query/security.query"

export default async function Page({ params }: { params: { clientSlug: string, constantSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")

    return (
        <div>test</div>

    )

}