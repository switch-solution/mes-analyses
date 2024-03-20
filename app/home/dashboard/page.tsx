import { userIsValid } from "@/src/query/security.query";
import MixBarChart from "@/components/chart/mixBarChart";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import TinyLineChart from "@/components/chart/tinyLineChart";
import Container from "@/components/layout/container";
export default async function Page() {
    const user = await userIsValid()
    if (!user) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    return (
        <Container>
            <div className="ml-2 size-1/12 w-full">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex size-full flex-col flex-wrap justify-between lg:size-11/12">

                <div className="flex h-1/4 w-full flex-col items-center md:size-1/2">
                    <span>Avancement de mes projets</span>
                    <MixBarChart />
                </div>
                <div className="flex h-1/4 w-full flex-col items-center md:size-1/2">
                    <span>Mes taches</span>
                    <TinyLineChart />
                </div>
                <div className="flex h-1/4 w-full flex-col items-center md:size-1/2">
                    <span>Mes projets</span>
                    <MixBarChart />
                </div>
                <div className="flex h-1/4 w-full flex-col items-center md:size-1/2">
                    <span>Mes projets</span>
                    <MixBarChart />
                </div>
            </div>
        </Container>


    )
}