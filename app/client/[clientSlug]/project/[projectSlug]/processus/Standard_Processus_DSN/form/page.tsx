import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import Container from "@/components/layout/container"
import UploadFileDsn from "@/components/form/dsn/upload"
import { getDsnStructure } from "@/src/query/dsn.query"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const dsnStructure = await getDsnStructure()
    return (
        <Container>
            <UploadFileDsn clientSlug={params.clientSlug} projectSlug={params.projectSlug} dsnStructure={dsnStructure} />
        </Container>
    )
}