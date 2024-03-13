import CreateSoftware from "@/components/form/setup/createSoftware"
import SetupSteep from "@/components/layout/setupSteep"
import { getMyClient } from "@/src/query/user.query"
import Container from "@/components/layout/container"
export default async function Page() {
    const client = await getMyClient()
    if (!client) throw new Error("Vous n'avez pas de client.")
    return (<Container>
        <SetupSteep step={4} />
        <CreateSoftware />
    </Container>
    )
}
