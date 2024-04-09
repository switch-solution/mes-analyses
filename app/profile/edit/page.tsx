import EditUser from "@/components/form/user/editUser"
import { Container } from "@/components/layout/container"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Security } from "@/src/classes/security"
import { User } from "@/src/classes/user"
export default async function Page() {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error('Vous n\'êtes pas autorisé à accéder à cette page')
    }
    const user = new User(security.userId)
    const userDetail = await user.getUserOtherData()
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