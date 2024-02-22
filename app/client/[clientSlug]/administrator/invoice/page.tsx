export default function Page({ params }: { params: { clientId: string } }) {
    return <div>Bill for client {params.clientId}</div>
}

