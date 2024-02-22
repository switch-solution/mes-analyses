import { redirect } from "next/navigation"
import { userIsComplete } from "@/src/query/user.query"
export default async function Page() {
    const userIsSetup = await userIsComplete()

    if (!userIsSetup) {
        return redirect("/setup/cgv")

    }

    return (
        <p>home</p>
    )
}