import { CreateCgv } from "@/components/form/setup/createCgv";
import SetupSteep from "@/components/layout/setupSteep";
import Container from "@/components/layout/container";
export default async function Page() {
    return (
        <Container>
            <SetupSteep step={1} />
            <CreateCgv />
        </Container>)

}