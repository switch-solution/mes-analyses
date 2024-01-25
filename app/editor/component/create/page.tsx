import { getAuthSession } from '@/lib/auth'
import CreateFormComponent from '@/src/features/form/component/create'
import { userIsEditor } from '@/src/query/security.query';
import { getMyClient } from '@/src/query/user.query';
import { getSoftwareByClient } from '@/src/query/software.query';
export default async function CreateComponent() {
    const session = await getAuthSession()
    if (!session?.user?.id) throw new Error('Vous devez être connecté')
    const isEditor = await userIsEditor();
    if (!isEditor) throw new Error('Vous devez être éditeur')
    const clientId = await getMyClient()
    if (!clientId) throw new Error('Vous devez avoir un client')
    const softwares = await getSoftwareByClient(clientId)
    return (
        <CreateFormComponent clientId={clientId} softwares={softwares} />
    )
}