import CreateClient from "@/components/form/setup/createClient";
import SetupSteep from "@/components/layout/setupSteep";
import Container from "@/components/layout/container";
export default async function Page() {

    return (<Container>
        <SetupSteep step={3} />
        <CreateClient />
    </Container>)
}