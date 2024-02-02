import { userIsValid } from "@/src/query/security.query"
import { getContactById } from "@/src/query/contact.query"
import { userIsAdminClient } from "@/src/query/security.query"
export default async function Page({ params }: { params: { clientId: string, contactId: string } }) {
    const userId = await userIsValid()
    const contact = await getContactById(params.contactId)
    const userIsAdmin = await userIsAdminClient(params.clientId)

    return (<div>test</div>)
}