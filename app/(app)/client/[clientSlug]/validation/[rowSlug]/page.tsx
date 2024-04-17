import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
import { notFound } from "next/navigation";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { validationDetail } from "@/src/query/validation.query";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
export default async function Page({ params }: { params: { clientSlug: string, rowSlug: string } }) {
    const security = new Security();
    const userId = await security.userIsValid();
    if (!userId) {
        throw new Error("L'utilisateur n'est pas connecté.");
    }
    const client = new Client(params.clientSlug);
    const clientExist = await client.clientExist();
    if (!clientExist) {
        notFound();
    }

    const validationList = await validationDetail(params.rowSlug);
    const validations = validationList.map((validation) => {
        return {
            clientSlug: params.clientSlug,
            firstname: validation.User.UserOtherData.at(0)?.firstname,
            lastname: validation.User.UserOtherData.at(0)?.lastname,
            isApproved: validation.isApproved,
            isRefused: validation.isRefused
        }

    })
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/validation/`}>Validation</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/validation/${params.rowSlug}`}>Détail</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={validations ? validations : []} inputSearch="projectLabel" inputSearchPlaceholder="Chercher par libellé" />
            </ContainerDataTable>
        </Container>

    )



}