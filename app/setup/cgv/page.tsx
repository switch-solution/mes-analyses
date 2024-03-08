import { CreateCgv } from "@/components/form/setup/createCgv";
import SetupSteep from "@/components/layout/setupSteep";
export default async function Page() {
    return (<div className="flex flex-col justify-center w-3/4">
        <SetupSteep step={1} />
        <CreateCgv />
    </div>)
}