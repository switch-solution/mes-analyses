import { getUser } from "@/src/query/user.query";
import ContactDelete from "@/components/form/contact/delete";
import { userIsAdminClient } from "@/src/query/security.query";
import { getContactById } from "@/src/query/contact.query";
export default async function Page({ params }: { params: { clientId: string, contactId: string } }) {
    const userId = await getUser()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour acceder à cette page')
    }
    const userIsAdmin = await userIsAdminClient(params.clientId)
    if (!userIsAdmin) {
        throw new Error('Vous devez etre admin pour acceder à cette page')
    }
    const contactExist = await getContactById(params.contactId)
    if (!contactExist) {
        throw new Error('Le contact n\'existe pas')
    }
    return (<div><ContactDelete contactId={params.contactId} /></div>)
}
