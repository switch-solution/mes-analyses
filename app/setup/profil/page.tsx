import CreateProfil from "@/components/form/setup/createProfil";
import SetupSteep from "@/src/features/layout/setupSteep";
export default async function Page() {

    return (<div>
        <SetupSteep step={2} />

        <CreateProfil />
    </div>)
}