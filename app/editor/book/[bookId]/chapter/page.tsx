export default async function Chapter({ params }: { params: { chapterId: string } }) {
    console.log(params.chapterId)
    return <div>{params.chapterId}</div>
}