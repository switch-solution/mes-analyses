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
export default async function Page() {
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