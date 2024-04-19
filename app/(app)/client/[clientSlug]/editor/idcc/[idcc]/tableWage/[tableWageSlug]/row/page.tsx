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

export default async function Page({ params }: { params: { clientSlug: string, idcc: string, tableWageSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Le client n'existe pas")
    }
    const security = new Security()
    const isEditor = await security.isEditorClient(clientExist.siren);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idcc = new Idcc(params.idcc)
    const tableList = await idcc.tableWageRow(params.tableWageSlug)
    const tables = tableList.map((table) => {
        return {
            id: table.id,
            label: table.label,
            coefficient: table.coefficient,
            position: table.position,
            echelon: table.echelon,
            qualification: table.qualification,
            value: table.value,
            indice: table.indice,

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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/idcc/${params.idcc}/tableWage/`}>Table des salaires</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/idcc/${params.idcc}/tableWage/${params.tableWageSlug}/row`}>Détail de la table</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <CardTitle>Table des salaires.</CardTitle>
                        <CardDescription>
                            Element standard non modifiable.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>Table des salaires.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Code</TableHead>
                                    <TableHead>Libellé</TableHead>
                                    <TableHead>Coefficient</TableHead>
                                    <TableHead>Qualification</TableHead>
                                    <TableHead>Indice</TableHead>
                                    <TableHead>Echelon</TableHead>
                                    <TableHead>Montant</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {tables.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="font-medium">{row.id}</TableCell>
                                        <TableCell>{row.label}</TableCell>
                                        <TableCell>{row.label}</TableCell>
                                        <TableCell>{row.coefficient}</TableCell>
                                        <TableCell>{row.qualification}</TableCell>
                                        <TableCell>{row.indice}</TableCell>
                                        <TableCell>{row.echelon}</TableCell>
                                        <TableCell>{row.value}</TableCell>

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