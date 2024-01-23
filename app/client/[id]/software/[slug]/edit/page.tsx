import { getSoftwareById } from "@/src/query/software.query"
import SoftwareForm from "@/components/form/software/Editform"
export default async function EditSoftware({ params }: { params: { slug: string } }) {
    const getSoftware = await getSoftwareById(params.slug)
    return (
        <div>
            <SoftwareForm software={getSoftware} />
        </div>
    )
}