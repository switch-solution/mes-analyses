import { CreateCgv } from "@/components/form/setup/createCgv";
import SetupSteep from "@/components/layout/setupSteep";
import { Container, ContainerDataTable } from "@/components/layout/container";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { User } from "@/src/classes/user";
import { Security } from "@/src/classes/security";
export default async function Page() {
    const security = new Security()
    const session = await security.session()
    if (!session) {
        throw new Error('L\'utilisateur n\'est pas authentifié')
    }

    if (!session.user.id) {
        throw new Error('L\'utilisateur n\'est pas authentifié')

    }
    const user = new User(session.user.id)
    const userDetail = await user.getUserDetail()
    return (
        <Container>
            <ContainerDataTable>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle><SetupSteep step={1} /></CardTitle>
                        <CardDescription>Valider les CGV de l&apos;application</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CreateCgv />
                    </CardContent>
                </Card>
            </ContainerDataTable>
        </Container>
    )

}