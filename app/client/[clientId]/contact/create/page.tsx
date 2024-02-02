import CreateFormContact from "@/src/features/form/contact/create"
export default function Page({ params }: { params: { id: string } }) {
    return (<CreateFormContact clientId={params.id} />)
}