import CreateClient from "@/components/form/setup/createClient";
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
import { Security } from "@/src/classes/security";

export default async function Page() {

    const security = new Security()
    const session = await security.session()
    if (!session) {
        throw new Error('L\'utilisateur n\'est pas authentifié')
    }
    return (
        <Container>
            <ContainerDataTable>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle><SetupSteep step={3} /></CardTitle>
                        <CardDescription>Renseigner vos informations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CreateClient />
                    </CardContent>
                </Card>
            </ContainerDataTable>
        </Container>

    )
}