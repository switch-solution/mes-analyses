import { getSoftwareById } from "@/src/query/software.query"
import { userIsValid } from "@/src/query/security.query"
import SoftwareForm from "@/src/features/form/software/edit"
export default async function Page({ params }: { params: { clientId: string, softwareId: string } }) {
    const userId = await userIsValid()

    const getSoftware = await getSoftwareById(params.softwareId)
    return (
        <div>
            <SoftwareForm software={getSoftware} />
        </div>
    )
}