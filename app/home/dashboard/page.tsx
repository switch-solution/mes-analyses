import { userIsValid } from "@/src/query/security.query";

export default async function Page() {
    const user = await userIsValid()
    if (!user) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    return (
        <div>
            <h1>Tableau de bord</h1>
        </div>
    )
}