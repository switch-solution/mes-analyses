import Container from "@/components/layout/container";
import { userIsAdminSystem } from "@/src/query/security.query";

export default async function Page() {
    const isAdmin = await userIsAdminSystem()
    if (!isAdmin) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page")
    }
    return (
        <Container>
            <h1>Admin</h1>
        </Container>
    )
}