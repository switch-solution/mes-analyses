import Container from "@/src/features/layout/Container"
import { userIsValid } from "@/src/query/security.query"
import CardWithOptions from "@/src/features/layout/CardWithOptions"
export default async function Home() {
    const userId = await userIsValid()
    if (!userId) throw new Error("You are not authorized to access this page")
    return (
        <Container>
            <CardWithOptions titre="Mes projets" content="3" href="/project/" />
            <CardWithOptions titre="Mes taches" content="3" href="/task/" />

        </Container>
    )
}