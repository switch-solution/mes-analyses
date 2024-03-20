export default function Page({ params }: { params: { attachmentId: string } }) {
    return (<p>{JSON.stringify(params.attachmentId)}</p>)


}