import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { EditCgv } from "@/components/form/profil/editCgv"
import { Security } from "@/src/classes/security"
import Link from "next/link"
import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
import { User } from "@/src/classes/user"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default async function Page() {
    const security = new Security()
    const session = await security.session()
    if (!session?.user.id) {
        throw new Error("Vous devez etre connecté pour acceder à cette page")
    }
    const user = new User(session.user.id)
    const userDetail = await user.getUserOtherData()
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/home">Accueil</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm title="Vaidation des CGV">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <CardTitle>Edition CGV</CardTitle>
                        <CardDescription>
                            Valider les CGV
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EditCgv cgv={userDetail.cgv} />
                    </CardContent>
                </Card>
            </ContainerForm>
        </Container>
    )
}