import CreateSoftware from "@/components/form/setup/createSoftware"
import SetupSteep from "@/components/layout/setupSteep"
import { Container } from "@/components/layout/container"
import { Security } from "@/src/classes/security"
import { User } from "@/src/classes/user"
export default async function Page() {
    const security = new Security()
    const userIsValid = await security.userIsValid()
    if (!userIsValid) {
        throw new Error("Vous devez être connecté pour accéder à cette page")
    }
    const user = new User(security.userId)
    const clientActive = await user.getMyClientActive()
    return (
        <Container>
            <SetupSteep step={4} />
            <CreateSoftware clientSlug={clientActive.clientSlug} />
        </Container>
    )
}
