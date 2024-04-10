import SoftwareDelete from "@/components/form/software/delete"
export default async function Page({ params }: { params: { softwareId: string } }) {
    return (
        <div>
            <SoftwareDelete softwareId={params.softwareId} />
        </div>
    )


}