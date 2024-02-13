import Example from "@/components/chart/tinyLineChart"
export default async function Page({ params }: { params: { projectId: string } }) {
    return (<div className="w-full h-full"><Example /></div>)
}

