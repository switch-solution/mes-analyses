import { userIsValid } from "@/src/query/security.query"
import SoftwareDelete from "@/src/features/form/software/delete"
export default async function Page({ params }: { params: { softwareId: string } }) {
    const userId = await userIsValid()
    return (
        <div>
            <SoftwareDelete softwareId={params.softwareId} />
        </div>
    )


}