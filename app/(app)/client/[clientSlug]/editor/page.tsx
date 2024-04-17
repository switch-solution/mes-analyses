import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    File,
    ArrowRight,
} from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
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

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
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
import { Security } from "@/src/classes/security"
import { Client } from "@/src/classes/client"
import { notFound } from "next/navigation"
import { Editor } from "@/src/classes/editor"
import { User } from "@/src/classes/user"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        notFound
    }
    const security = new Security()
    const userIsEditor = await security.isEditorClient(clientExist.siren)
    if (!userIsEditor) {
        throw new Error("Vous n'etes pas autorisé à acceder à cette page")
    }
    const user = new User(security.userId)
    const clientActive = await user.getMyClientActive()
    const softwareActive = await user.getMySoftwareActive()
    const editor = new Editor(clientActive.clientId, softwareActive.softwareLabel)
    const { countDsn, countIdcc, countOps, countAbsence } = await editor.getCountStandardElement()
    const { countSetting, countConstant } = await editor.getCountSoftwareElement()

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
                                    <Link href={`/client/${params.clientSlug}/editor`}>Editeur</Link>
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
                                    <CardTitle>Editeur</CardTitle>
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        Commencer à éditer les données de votre logiciel <span className='font-bold'>{softwareActive.softwareLabel}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Link href={`/client/${client.clientSlug}/software/create`}><Button>Créer un logiciel</Button></Link>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription>Mes actions en attente</CardDescription>
                                    <CardTitle className="flex justify-center text-4xl">5</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +25% depuis la semaine dernière
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={25} aria-label="25% increase" />
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>Mes messages en attente</CardDescription>
                                    <CardTitle className="flex justify-center text-4xl">50</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +10% depuis la semaine dernière
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={12} aria-label="12% increase" />
                                </CardFooter>
                            </Card>
                        </div>
                        <Tabs defaultValue="standard">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="standard">Standard</TabsTrigger>
                                    <TabsTrigger value="software">Logiciel</TabsTrigger>
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
                            <TabsContent value="standard">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Element standard</CardTitle>
                                        <CardDescription>
                                            Element standard non modifiable
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Element</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Nombre d&apos;enregistrements
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Ouvrir
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-medium">Organisme de protection sociale</TableCell>
                                                    <TableCell>{countOps}</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/ops`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Convention collective</TableCell>
                                                    <TableCell>{countIdcc}</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/idcc`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Structure DSN</TableCell>
                                                    <TableCell>{countDsn}</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/dsn`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Code absence DSN</TableCell>
                                                    <TableCell>{countAbsence}</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/absence`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="software">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Element logiciel</CardTitle>
                                        <CardDescription>
                                            Element logiciel modifiable
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Element</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Nombre d&apos;enregistrements
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Ouvrir
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-medium">Paramétres</TableCell>
                                                    <TableCell>{countSetting}</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/${softwareActive.softwareSlug}/setting`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Zone de texte</TableCell>
                                                    <TableCell>10</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/${softwareActive.softwareSlug}/textarea`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Tabe des ages</TableCell>
                                                    <TableCell>10</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/${softwareActive.softwareSlug}/age`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Table ancienneté</TableCell>
                                                    <TableCell>10</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/${softwareActive.softwareSlug}/seniority`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Table des maintiens des salaires</TableCell>
                                                    <TableCell>10</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/${softwareActive.softwareSlug}/keepingWage`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Absences</TableCell>
                                                    <TableCell>10</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/${softwareActive.softwareSlug}/absence`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Profil de paie</TableCell>
                                                    <TableCell>10</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/${softwareActive.softwareSlug}/profile`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Constante</TableCell>
                                                    <TableCell>10</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/${softwareActive.softwareSlug}/constant`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Compteur</TableCell>
                                                    <TableCell>10</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/${softwareActive.softwareSlug}/accumulation`}><ArrowRight /></Link></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Rubrique</TableCell>
                                                    <TableCell>10</TableCell>
                                                    <TableCell className="text-right"><Link href={`/client/${client.clientSlug}/editor/${softwareActive.softwareSlug}/item}`}><ArrowRight /></Link></TableCell>
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
