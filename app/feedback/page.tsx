import Feedback from "@/components/form/feedback/feebackForm";
import { Container } from "@/components/layout/container";
import { Security } from "@/src/classes/security";
export default async function Page() {
    const security = new Security()

    const user = await security.userIsValid()
    if (!user) {
        throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    }
    return (
        <Container>
            <Feedback />
        </Container>
    )
}