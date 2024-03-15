import { userIsValid } from '@/src/query/security.query'
import EditUser from "@/components/form/user/editUser"
import Container from "@/components/layout/container"
import { getUserOtherData } from '@/src/query/user.query'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous n\'êtes pas autorisé à accéder à cette page')
    }
    const userDetail = await getUserOtherData(userId)
    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <EditUser user={userDetail} />
        </Container>
    )
}