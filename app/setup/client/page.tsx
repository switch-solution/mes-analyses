import CreateClient from "@/components/form/setup/createClient";
import SetupSteep from "@/src/features/layout/setupSteep";
export default async function Page() {

    return (<div>
        <SetupSteep step={3} />

        <CreateClient />
    </div>)
}