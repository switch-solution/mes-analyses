import Container from "@/src/features/layout/container"
import { userIsValid } from "@/src/query/security.query"
import CardWithOptions from "@/src/features/layout/cardWithOptions"
import { getCountMyProjects } from "@/src/query/project.query"
import { redirect } from "next/navigation"
import { getMyClient } from "@/src/query/user.query"
export default async function Home() {
    console.log("Home")
    const userId = await userIsValid()
    if (!userId) throw new Error("You are not authorized to access this page")
    const countMyProjects = await getCountMyProjects()
    const client = await getMyClient()
    if (client?.length === 0) {
        redirect("/setup/")

    }
    return (
        <Container>
            <CardWithOptions titre="Mes projets" content={countMyProjects} href="/project/" />
            <CardWithOptions titre="Mes taches" content="3" href="/task/" />
        </Container>
    )
}