import { userIsValid } from "@/src/query/security.query";
export default async function Page({ params }: { params: { componentId: string } }) {
    const userId = await userIsValid()
    return (<p>test</p>)
}