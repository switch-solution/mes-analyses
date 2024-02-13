import CreateFormComponent from '@/src/features/form/component/create'
import { userIsEditorClient, userIsValid } from '@/src/query/security.query';
import { getSoftwareByUserIsEditor } from '@/src/query/software.query';
import { getMyClientActive } from '@/src/query/client.query';
export default async function CreateComponent() {
    const userId = await userIsValid()
    if (!userId) throw new Error('Vous devez être connecté')
    const clientId = await getMyClientActive()
    if (!clientId) throw new Error('Vous devez avoir un client actif')
    const isEditor = await userIsEditorClient(clientId)
    if (!isEditor) throw new Error('Vous devez être éditeur pour accéder à cette page')
    const softwares = await getSoftwareByUserIsEditor()
    return (
        <CreateFormComponent clientId={clientId} softwares={softwares} />
    )
}