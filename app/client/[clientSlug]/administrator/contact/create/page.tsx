import CreateFormContact from "@/components/form/contact/create"
export default function Page({ params }: { params: { id: string } }) {
    return (<CreateFormContact clientId={params.id} />)
}