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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
    const endTrial = await client.endTrial()
    const userBillable = await client.userClientBillable()
    const clientDetail = await client.clientDetail()
    const softareClient = await client.softwareClient()
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
                                    <CardTitle className="flex justify-center text-4xl">{softareClient.length}</CardTitle>
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
                                    <CardDescription>Fin de prériode d&apos;essai</CardDescription>
                                    <CardTitle className="flex justify-center text-4xl">{endTrial}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        Jours restants
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={12} aria-label="Avancement" />
                                </CardFooter>
                            </Card>
                        </div>
                        <Tabs defaultValue="enable">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="enable">Actif</TabsTrigger>
                                    <TabsTrigger value="archived">Archivé</TabsTrigger>
                                    <TabsTrigger value="disable">En attente</TabsTrigger>
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
                            <TabsContent value="enable">
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
                                                                        <div className="font-medium">{userClient.user.UserOtherData.at(0)?.lastname}</div>
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
