import { CreateCgv } from "@/components/form/setup/createCgv";
import SetupSteep from "@/components/layout/setupSteep";
export default async function Page() {
    return (<div className="flex w-3/4 flex-col justify-center">
        <SetupSteep step={1} />
        <CreateCgv />
    </div>)
}