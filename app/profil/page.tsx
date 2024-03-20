import { userIsValid } from "@/src/query/security.query";
import Container from "@/components/layout/container";
export default async function Page() {
    const user = await userIsValid()
    return (
        <Container>
            <div className="flex w-full flex-col items-center">
                <h1 className="text-4xl font-bold">Profil</h1>
            </div>
        </Container>
    )
}
