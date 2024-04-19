import CreateSoftware from "@/components/form/setup/createSoftware"
import SetupSteep from "@/components/layout/setupSteep"
import { Container, ContainerDataTable } from "@/components/layout/container"
import { Security } from "@/src/classes/security"
import { User } from "@/src/classes/user"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
            <ContainerDataTable>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle><SetupSteep step={4} /></CardTitle>
                        <CardDescription>Créer votre logiciel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CreateSoftware clientSlug={clientActive.clientSlug} setup={true} />
                    </CardContent>
                </Card>
            </ContainerDataTable>
        </Container>

    )
}