import CreateProfil from "@/components/form/setup/createProfil";
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
export default async function Page() {

    return (
        <Container>
            <ContainerDataTable>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle><SetupSteep step={2} /></CardTitle>
                        <CardDescription>Renseigner vos informations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CreateProfil />
                    </CardContent>
                </Card>
            </ContainerDataTable>
        </Container>

    )
}