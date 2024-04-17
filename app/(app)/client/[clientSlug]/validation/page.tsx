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
import { getValidationStatus } from "@/src/query/validation.query";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
export default async function Page({ params }: { params: { clientSlug: string } }) {
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

    const validationList = await getValidationStatus(params.clientSlug);
    const validations = validationList?.validationGroupBy.map((validation) => {
        const countPending = validationList.countPendingList.find((count) => count.rowSlug === validation.rowSlug)?.count;
        const countApproved = validationList.countApprovedList.find((count) => count.rowSlug === validation.rowSlug)?.count;
        const countRefused = validationList.countRefusedList.find((count) => count.rowSlug === validation.rowSlug)?.count;
        const detail = validationList.validationDetailList.find((detail) => detail.rowSlug === validation.rowSlug);
        return {
            projectLabel: detail?.projectLabel,
            clientSlug: params.clientSlug,
            description: detail?.description,
            theme: detail?.theme,
            rowSlug: validation.rowSlug,
            countPending: countPending || 0,
            countApproved: countApproved || 0,
            countRefused: countRefused || 0
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
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={validations ? validations : []} inputSearch="projectLabel" inputSearchPlaceholder="Chercher par libellé" />
            </ContainerDataTable>
        </Container>

    )



}