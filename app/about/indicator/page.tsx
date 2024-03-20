import { userIsValid } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import { getCountAllTables } from "@/src/query/bdd.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import IndicatorBdd from "@/components/indicatorBdd/indicatorBdd";
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous n\'êtes pas autorisé à accéder à cette page')
    }

    const count = await getCountAllTables()

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
            <IndicatorBdd count={count} />
        </Container>
    )
}