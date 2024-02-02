import EditFormContact from "@/src/features/form/contact/edit"
import { getContactById } from "@/src/query/contact.query"
import { userIsValid } from "@/src/query/security.query"

export default async function Page({ params }: { params: { clientId: string, contactId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour acceder à cette page')
    }
    const contact = await getContactById(params.contactId)
    if (!contact) {
        throw new Error('Pas de contact')
    }
    let contactToPass: {
        id: string,
        civility: string,
        firstname: string,
        lastname: string,
        email: string,
        phone?: string,
        clientId: string
    } = {
        id: contact.id,
        civility: contact.civility,
        firstname: contact.firstname,
        lastname: contact.lastname,
        email: contact.email,
        phone: contact.phone ? contact.phone : "",
        clientId: contact.clientId
    };

    return (<div><EditFormContact contact={contactToPass} /></div>)
}