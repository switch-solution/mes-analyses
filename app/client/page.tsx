import { getMyClientActive } from '@/src/query/client.query';
import { redirect } from 'next/navigation';

export default async function Client() {

    const clientId = await getMyClientActive();

    if (!clientId) {
        redirect('/home')
    }

    redirect(`/client/${clientId}`)



    return (
        <div>
            <h1>Client</h1>
        </div>
    )

}