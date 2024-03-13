import { userIsValid } from "@/src/query/security.query";

export default async function Page() {
    const userIdValid = await userIsValid()
    if (!userIdValid) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}