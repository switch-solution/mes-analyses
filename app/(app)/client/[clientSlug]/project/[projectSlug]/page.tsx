import Link from "next/link"
import AlertPageValidation from "@/components/alert/alertPageValidation"
import {
    ChevronLeft,
    ChevronRight,
    Unlock,
    Lock,
    ArrowRight,
    Import,
    Check,
    PrinterIcon
} from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Project } from "@/src/classes/project"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { User } from "@/src/classes/user"
import { Security } from "@/src/classes/security"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        notFound()
    }
    const security = new Security()
    await security.isAuthorizedInThisProject(params.projectSlug)
    const user = new User(security.userId)
    const client = await user.getMyClientActive()
    const projectDetails = await project.projectDetails()
    if (!projectDetails) {
        notFound()
    }
    const countUser = (await project.getUsers()).length
    const pages = await project.pages()
    const allPages = await prisma.page.findMany({
        where: {
            softwareLabel: projectDetails.softwareLabel,
            clientId: client.clientId,
            status: 'Validé'
        }
    })
    const countForms = await project.countForms()
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/home">Accueil</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/client/${client.clientSlug}/project`}>Projets</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/client/${client.clientSlug}/project/Mon projet`}>Mon projet</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card
                                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle>Projet : <span>{projectDetails?.label}</span></CardTitle>
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        {projectDetails?.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button><Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/edit`}>Editer le projet</Link></Button>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription>Document joint</CardDescription>
                                    <CardTitle className="flex justify-center text-4xl">{countUser}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/file`}>Consulter les documents</Link>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>Extraction disponible</CardDescription>
                                    <CardTitle className="flex justify-center text-4xl">{countForms}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/extraction`}>Consulter la liste des extractions</Link>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                </CardFooter>
                            </Card>
                        </div>
                        <Tabs defaultValue="page">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="page">Pages</TabsTrigger>
                                    <TabsTrigger value="duplicate">Copier des pages</TabsTrigger>
                                    <TabsTrigger value="import">Import des données</TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="page">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Page</CardTitle>
                                        <CardDescription>
                                            Les pages de mon projet.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Titre</TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Date de création
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Status
                                                    </TableHead>
                                                    <TableHead className="md:table-cell">
                                                        Imprimer
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Ouvrir
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {pages.map((row) => {
                                                    return (<TableRow key={row.pageId}>
                                                        <TableCell className="font-medium"><Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/page/${row.slug}`}>{row.label}</Link></TableCell>
                                                        <TableCell className="hidden md:table-cell">{row.createdAt.toLocaleDateString()}</TableCell>
                                                        <TableCell className="hidden md:table-cell">{row.status === 'En cours de rédaction' ? <AlertPageValidation clientSlug={params.clientSlug} projectSlug={params.projectSlug} projectPageSlug={row.slug} />
                                                            : <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/page/${row.slug}/workflow`}><Lock /></Link>}</TableCell>
                                                        <TableCell><PrinterIcon /></TableCell>
                                                        <TableCell className="hidden md:table-cell"><Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/page/${row.slug}`}><ArrowRight /></Link></TableCell>
                                                    </TableRow>
                                                    )
                                                })}

                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="duplicate">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Import page</CardTitle>
                                        <CardDescription>
                                            Liste des pages disponibles
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Titre</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Version
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Date de création
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Importer
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    allPages.map((row) => {
                                                        return (<TableRow key={row.id}>
                                                            <TableCell className="font-medium">{row.label}</TableCell>
                                                            <TableCell>{row.version}</TableCell>
                                                            <TableCell>{row.createdAt.toLocaleDateString()}</TableCell>
                                                            <TableCell><Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/duplicate/${row.slug}`}><Import /></Link></TableCell>
                                                        </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="import">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Import des données</CardTitle>
                                        <CardDescription>
                                            Liste des imports disponibles
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Titre</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Description
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Importer
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-medium">DSN</TableCell>
                                                    <TableCell>Importer les données à partir de vos fichiers DSN</TableCell>
                                                    <TableCell><Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/dsn`}><Import /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Convention colletive</TableCell>
                                                    <TableCell>Importer les données à partir du référentiel CCN</TableCell>
                                                    <TableCell><Import /></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Rubriques</TableCell>
                                                    <TableCell>Importer les données à partir du référentiel CCN</TableCell>
                                                    <TableCell><Import /></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                    </div>
                    <div>
                        <Card
                            className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-start bg-muted/50">
                                <div className="grid gap-0.5">
                                    <CardTitle className="group flex items-center gap-2 text-lg">
                                        Nouveautés
                                    </CardTitle>
                                    <CardDescription></CardDescription>
                                </div>
                            </CardHeader>

                            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                                <div className="text-xs text-muted-foreground">
                                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                                </div>
                                <Pagination className="ml-auto mr-0 w-auto">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button size="icon" variant="outline" className="size-6">
                                                <ChevronLeft className="size-3.5" />
                                                <span className="sr-only">Previous Order</span>
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button size="icon" variant="outline" className="size-6">
                                                <ChevronRight className="size-3.5" />
                                                <span className="sr-only">Next Order</span>
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}