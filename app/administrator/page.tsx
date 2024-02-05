import { userIsAdminSystem, userIsValid } from "@/src/query/security.query";

export default async function Page() {
    const user = await userIsValid()
    if (!user) {
        throw new Error('Unauthorized')
    }
    const userIsAdmin = await userIsAdminSystem()
    return <div>Administrator Page</div>;
}