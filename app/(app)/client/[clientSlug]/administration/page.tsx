import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    ArrowRight,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    Truck,
    Users2,
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
import { Client } from "@/src/classes/client"
import { Security } from "@/src/classes/security"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const security = new Security()
    const userisValid = await security.userIsValid()
    if (!userisValid) {
        throw new Error("ID utilisateur manquant")
    }
    const today = new Date().toLocaleDateString()
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    const userBillable = await client.userClientBillable()
    const userFree = await client.userClientFree()
    const clientDetail = await client.clientDetail()
    const softareClient = await client.softwareClient(clientExist.siren)
    const clientApi = await client.clientApi()
    const invitation = await client.getInvitation()
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
                                    <Link href={`/client/${client.clientSlug}/administration`}>Administration</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
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
                                    <CardTitle>{clientDetail?.socialReason}</CardTitle>
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        Editer la fiche client.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Link href={`/client/${client.clientSlug}/administration/edit`}><Button>Editer la fiche client</Button></Link>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription>Nombre de logiciel</CardDescription>
                                    <CardTitle className="flex justify-center text-4xl"><Link href={`/client/${params.clientSlug}/administration/software`}>{softareClient.length}</Link></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/client/${client.clientSlug}/software/create`}><Button>Créer un logiciel</Button></Link>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>Nombre d&apos;API</CardDescription>
                                    <CardTitle className="flex justify-center text-4xl"><Link href={`/client/${params.clientSlug}/administration/api`}>{clientApi.Client_API.length}</Link></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/client/${client.clientSlug}/administration/api/create`}><Button>Créer une API</Button></Link>
                                </CardFooter>
                            </Card>
                        </div>
                        <Tabs defaultValue="bilable">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="bilable">Facturable</TabsTrigger>
                                    <TabsTrigger value="free">Non facturable</TabsTrigger>
                                    <TabsTrigger value="disable">Bloqué</TabsTrigger>
                                    <TabsTrigger value="invitation">Invitation</TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="bilable">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Utililisateurs</CardTitle>
                                        <CardDescription>
                                            Mes utilisateurs facturables
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Nom</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Prénom
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Administrateur
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Ouvrir
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    userBillable.map((user) => (
                                                        user.UserClient.map((userClient) => (
                                                            <TableRow key={userClient.userId} className="bg-accent">
                                                                <TableCell>
                                                                    <div className="font-medium">{userClient.user.UserOtherData.at(0)?.lastname}</div>
                                                                </TableCell>
                                                                <TableCell className="hidden sm:table-cell">
                                                                    <Badge className="text-xs" variant="secondary">
                                                                        <div className="font-medium">{userClient.user.UserOtherData.at(0)?.firstname}</div>
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell className="hidden md:table-cell">
                                                                    <div className="font-medium">{userClient.isAdministrator}</div>
                                                                </TableCell>
                                                                <TableCell className="hidden md:table-cell">
                                                                    <Link href={'/home'}>
                                                                        <ArrowRight />
                                                                    </Link>
                                                                </TableCell>
                                                            </TableRow>

                                                        ))
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="free">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Utililisateurs</CardTitle>
                                        <CardDescription>
                                            Mes utilisateurs facturables
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Nom</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Prénom
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Administrateur
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Ouvrir
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    userFree.map((user) => (
                                                        user.UserClient.map((userClient) => (
                                                            <TableRow key={userClient.userId} className="bg-accent">
                                                                <TableCell>
                                                                    <div className="font-medium">{userClient.user.UserOtherData.at(0)?.lastname}</div>
                                                                </TableCell>
                                                                <TableCell className="hidden sm:table-cell">
                                                                    <Badge className="text-xs" variant="secondary">
                                                                        <div className="font-medium">{userClient.user.UserOtherData.at(0)?.firstname}</div>
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell className="hidden md:table-cell">
                                                                    <div className="font-medium">{userClient.isAdministrator}</div>
                                                                </TableCell>
                                                                <TableCell className="hidden md:table-cell">
                                                                    <Link href={'/home'}>
                                                                        <ArrowRight />
                                                                    </Link>
                                                                </TableCell>
                                                            </TableRow>

                                                        ))
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="invitation">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Utililisateurs</CardTitle>
                                        <CardDescription>
                                            Mes invitations en attente
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Email</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Nom
                                                    </TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Prénom
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Email envoyé
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Ouvrir
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    invitation.map((user) => (
                                                        user.Invitation.map((invitation) => (
                                                            <TableRow key={invitation.email} className="bg-accent">
                                                                <TableCell>
                                                                    <div className="font-medium">{invitation.email}</div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div className="font-medium">{invitation.lastname}</div>
                                                                </TableCell>
                                                                <TableCell className="hidden sm:table-cell">
                                                                    <div className="font-medium">{invitation.firstname}</div>
                                                                </TableCell>
                                                                <TableCell className="hidden md:table-cell">
                                                                    <div className="font-medium"><Badge variant={invitation.sendEmail ? "default" : "destructive"} >{invitation.sendEmail ? "Envoyé" : "Erreur"}</Badge></div>
                                                                </TableCell>
                                                                <TableCell className="hidden md:table-cell">
                                                                    <Link href={'/home'}>
                                                                        <ArrowRight />
                                                                    </Link>
                                                                </TableCell>
                                                            </TableRow>

                                                        ))
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
                                    <CardDescription>{today}</CardDescription>
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
