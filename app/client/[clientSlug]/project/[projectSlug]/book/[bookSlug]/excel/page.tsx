import { userIsAuthorizeInThisProject } from "@/src/query/security.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, bookSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug);
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    return (<div>test</div>)


}