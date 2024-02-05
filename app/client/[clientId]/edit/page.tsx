export default function Page({ params }: { params: { clientId: string } }) {
    return (
        <div>
            <h1>Edit client {params.clientId}</h1>
        </div>
    )

}