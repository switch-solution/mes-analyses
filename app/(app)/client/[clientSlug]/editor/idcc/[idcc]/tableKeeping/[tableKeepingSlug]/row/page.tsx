import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Idcc } from "@/src/classes/idcc"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function Page({ params }: { params: { clientSlug: string, idcc: string, tableKeepingSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Le client n'existe pas")
    }
    const security = new Security()
    const isEditor = await security.isEditorClient(clientExist.siren);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idcc = new Idcc(params.idcc)
    const tableList = await idcc.tableKeepingRow(params.tableKeepingSlug)
    const tables = tableList.map((table) => {
        return {
            id: table.id,
            label: table.label,
            minMonth: table.minMonth,
            maxMonth: table.maxMonth,
            deficiency: table.deficiency,
            pourcentage: table.pourcentage,
            numberOfDay: table.numberOfDay

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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/`}>Editeur</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/idcc`}>Idcc</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/idcc/${params.idcc}`}>{params.idcc}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/idcc/${params.idcc}/tableKeeping/`}>Table des maintiens</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/idcc/${params.idcc}/tableKeeping/${params.tableKeepingSlug}/row`}>Détail de la table</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <CardTitle>Table maintien des salaires</CardTitle>
                        <CardDescription>
                            Element standard non modifiable
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>Table maintien des salaires</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Code</TableHead>
                                    <TableHead>Libellé</TableHead>
                                    <TableHead>Carence</TableHead>
                                    <TableHead>Ancienneté minimum</TableHead>
                                    <TableHead>Ancienneté maximum</TableHead>
                                    <TableHead>Nombre de jours</TableHead>
                                    <TableHead>Pourcentage</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {tables.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="font-medium">{row.id}</TableCell>
                                        <TableCell>{row.label}</TableCell>
                                        <TableCell>{row.deficiency}</TableCell>
                                        <TableCell>{row.minMonth}</TableCell>
                                        <TableCell>{row.maxMonth}</TableCell>
                                        <TableCell>{row.numberOfDay}</TableCell>
                                        <TableCell>{row.pourcentage}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>

                    </CardContent>
                </Card>
            </ContainerDataTable>
        </Container>
    )
}