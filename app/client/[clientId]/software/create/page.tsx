import SoftwareForm from "@/src/features/form/software/create"
export default async function Page({ params }: { params: { clientId: string } }) {
    return (<SoftwareForm clientId={params.clientId} />)
}