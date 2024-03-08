import { Scale, UserRoundCog, Building2, MoveRight, Computer } from "lucide-react"
export default function SetupSteep({ step }: { step: number }) {
    return (<div className="flex flex-row w-full justify-between lg:w-3/4">
        <div>
            <Scale />
            {step === 1 && "En cours"}
        </div>
        <div>
            <MoveRight />
        </div>
        <div>
            <UserRoundCog />
            {step === 2 && "En cours"}

        </div>
        <div>
            <MoveRight />
        </div>
        <div>
            <Building2 />
            {step === 3 && "En cours"}

        </div>
        <div>
            <MoveRight />
        </div>
        <div>
            <Computer />
            {step === 4 && "En cours"}

        </div>


    </div>

    )
}