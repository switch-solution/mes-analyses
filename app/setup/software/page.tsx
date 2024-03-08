import CreateSoftware from "@/components/form/setup/createSoftware"
import SetupSteep from "@/components/layout/setupSteep"
import { getMyClient } from "@/src/query/user.query"
export default async function Page() {
    const client = await getMyClient()
    if (!client) throw new Error("Vous n'avez pas de client.")
    return (<div>
        <SetupSteep step={4} />

        <CreateSoftware />
    </div>
    )
}
