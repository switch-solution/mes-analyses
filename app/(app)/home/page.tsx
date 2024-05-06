import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    File,
    ArrowRight,
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
import { User } from "@/src/classes/user"
import { getAuthSession } from "@/lib/auth"
import { redirect } from 'next/navigation'
import { copyInvitation, getInvitation } from "@/src/query/invitation.query";

export default async function Page() {
    const today = new Date().toLocaleDateString()
    const session = await getAuthSession()
    if (!session) {
        redirect("/api/auth/signin")
    }
    const userId = session.user.id
    if (!userId) {
        throw new Error("ID utilisateur manquant")
    }
    const user = new User(userId)
    const userDetail = await user.getUserDetail()
    const invitation = await getInvitation(userDetail.email)
    if (invitation) {
        await copyInvitation(invitation, userId)
        redirect("/cgv")
        return

    }
    const userIsSetup = await user.userIsSetup()
    const cgv = userDetail.UserOtherData.at(0)?.cgv
    if (!cgv) {
        redirect("/cgv")
    }
    if (!userIsSetup) {
        redirect("/setup/cgv")
    }
    const client = await user.getMyClientActive()
    if (!client) {
        throw new Error("Client manquant")
    }
    const activity = await user.getLogs()
    const projects = await user.myProject()
    const projectIsOpen = projects.filter((project) => project.project.status === "Actif")
    const projectIsAppoved = projects.filter((project) => project.project.status === "Archivé")
    const projectIsPending = projects.filter((project) => project.project.status === "En attente")

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
                                    <CardTitle>Projet</CardTitle>
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        Commencer un nouveau projet.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Link href={`/client/${client.clientSlug}/project/create`}><Button>Créer un projet</Button></Link>
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
                        <Tabs defaultValue="isOpen">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="isOpen">Actif</TabsTrigger>
                                    <TabsTrigger value="isPending">En attente</TabsTrigger>
                                    <TabsTrigger value="isApproved">Finalisé</TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="isOpen">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Projets</CardTitle>
                                        <CardDescription>
                                            Mes projets
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Titre</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Status
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
                                                    projectIsOpen.map((project) => (
                                                        <TableRow key={project.project.slug} className="bg-accent">
                                                            <TableCell>
                                                                <div className="font-medium"><Link href={`/client/${client.clientSlug}/project/${project.project.slug}`}>{project.project.label}</Link></div>
                                                            </TableCell>
                                                            <TableCell className="sm:table-cell">
                                                                <Badge className="text-xs" >
                                                                    {project.project.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                {project.project.createdAt.toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <Link href={`/client/${client.clientSlug}/project/${project.project.slug}`}>
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
                            <TabsContent value="isPending">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Projets</CardTitle>
                                        <CardDescription>
                                            Mes projets
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Titre</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Status
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
                                                    projectIsPending.map((project) => (
                                                        <TableRow key={project.project.slug} className="bg-accent">
                                                            <TableCell>
                                                                <div className="font-medium">{project.project.label}</div>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell">
                                                                <Badge className="text-xs" variant="secondary">
                                                                    {project.project.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                {project.project.createdAt.toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <Link href={`/client/${client.clientSlug}/project/${project.project.slug}`}>
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
                            <TabsContent value="isApproved">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Projets</CardTitle>
                                        <CardDescription>
                                            Mes projets
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Titre</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Status
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
                                                    projectIsAppoved.map((project) => (
                                                        <TableRow key={project.project.slug} className="bg-accent">
                                                            <TableCell>
                                                                <div className="font-medium">{project.project.label}</div>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell">
                                                                <Badge className="text-xs" variant="secondary">
                                                                    {project.project.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                {project.project.createdAt.toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <Link href={`/client/${client.clientSlug}/project/${project.project.slug}`}>
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
                                    <CardDescription>{today}</CardDescription>
                                </div>
                            </CardHeader>
                            {activity.map((activity) => {
                                return (
                                    <>
                                        <CardContent key={activity.id}>
                                            <div className="grid gap-3">
                                                <div className="font-semibold"></div>
                                                <ul className="grid gap-3">
                                                    <li className="flex items-center justify-between">
                                                        <span className="text-muted-foreground">
                                                            {activity.message}
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <span className="text-muted-foreground">
                                                            <Badge>{activity.level}</Badge>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </CardContent>
                                        <Separator className="my-2" />

                                    </>
                                )
                            })}
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
