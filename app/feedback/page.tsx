import { userIsValid } from "@/src/query/security.query";
import Feedback from "@/components/form/feedback/feebackForm";
import Container from "@/components/layout/container";
export default async function Page() {
    const user = await userIsValid()
    if (!user) {
        throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    }
    return (
        <Container>
            <Feedback />
        </Container>
    )
}