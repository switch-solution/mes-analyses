import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    File,
    ArrowRight,
    Printer
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
import AlertApproveProcessus from "@/components/alert/alertApproveProcessus"
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
    const processus = await project.processus()
    const processusOpen = processus.filter((processus) => processus.isOpen === true)
    const processusPending = processus.filter((processus) => processus.isPending === true)
    const processusInProgress = processus.filter((processus) => processus.isProgress === true)
    const countUser = (await project.getUsers()).length
    const countExtraction = (await project.processus()).length
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="hidden md:flex">
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
                                    <CardTitle className="flex justify-center text-4xl">{countExtraction}</CardTitle>
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
                        <Tabs defaultValue="isOpen">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="isOpen">Actif</TabsTrigger>
                                    <TabsTrigger value="isPending">En attente</TabsTrigger>
                                    <TabsTrigger value="isProgress">En cours de validation</TabsTrigger>
                                    <TabsTrigger value="isFinish">Validé</TabsTrigger>
                                    <TabsTrigger value="isReopn">Réouverture</TabsTrigger>
                                </TabsList>
                                <div className="ml-auto flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <File className="size-3.5" />
                                        <span className="sr-only sm:not-sr-only">Export</span>
                                    </Button>
                                </div>
                            </div>
                            <TabsContent value="isOpen">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Etape</CardTitle>
                                        <CardDescription>
                                            Liste des étapes à réaliser
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
                                                        Imprimer
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Ouvrir
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Valider
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    processusOpen.map((processus) => (
                                                        <TableRow key={processus.id} className="bg-accent">
                                                            <TableCell>
                                                                <div className="font-medium">{processus.label}</div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                {processus.createdAt.toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <Link href={`/client/${client.clientSlug}/project/${params.projectSlug}/processus/${processus.processusSlug}/pdf`}>
                                                                    <Printer />
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <Link href={`/client/${client.clientSlug}/project/${params.projectSlug}/processus/${processus.processusSlug}`}>
                                                                    <ArrowRight />
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <AlertApproveProcessus processusSlug={processus.processusSlug} clientSlug={client.clientSlug} projectSlug={params.projectSlug} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="isPending">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Etape</CardTitle>
                                        <CardDescription>
                                            Liste des étapes en attente
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Titre</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Thême
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Date de création
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Ouvrir
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    processusPending.map((processus) => (
                                                        <TableRow key={processus.id} className="bg-accent">
                                                            <TableCell>
                                                                <div className="font-medium">{processus.label}</div>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell">
                                                                <Badge className="text-xs" variant="secondary">
                                                                    {processus.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                {processus.createdAt.toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <Link href={`/client/${client.clientSlug}/project/${params.projectSlug}/processus/${processus.processusSlug}`}>
                                                                    <ArrowRight />
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>

                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="isProgress">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Etape</CardTitle>
                                        <CardDescription>
                                            Liste des étapes en attente
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Titre</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Thême
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Date de création
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Ouvrir
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    processusInProgress.map((processus) => (
                                                        <TableRow key={processus.id} className="bg-accent">
                                                            <TableCell>
                                                                <div className="font-medium">{processus.label}</div>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell">
                                                                <Badge className="text-xs" variant="secondary">
                                                                    {processus.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                {processus.createdAt.toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <Link href={`/client/${client.clientSlug}/project/${params.projectSlug}/processus/${processus.processusSlug}`}>
                                                                    <ArrowRight />
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>

                                                    ))
                                                }
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