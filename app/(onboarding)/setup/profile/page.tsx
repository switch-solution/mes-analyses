import CreateProfil from "@/components/form/setup/createProfil";
import SetupSteep from "@/components/layout/setupSteep";
import { Container } from "@/components/layout/container";
export default async function Page() {

    return (<Container>
        <SetupSteep step={2} />
        <CreateProfil />
    </Container>)
}