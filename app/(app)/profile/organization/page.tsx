import { Security } from "@/src/classes/security";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { User } from "@/src/classes/user";
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
export default async function Page() {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error('User data not found')
    }
    const user = new User(userId.id)
    const clients = await user.getMyClientsAll()
    const softwares = await user.getMySoftwaresAll()
    return (
        <Container>
            <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Profil</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                        <Link href="/profile" >
                            Mes informations
                        </Link>
                        <Link href="/profile/security">Securité</Link>
                        <Link href="/profile/organization" className="font-semibold text-primary">Organisation</Link>
                        <Link href="#">Support</Link>
                        <Link href="#">Advanced</Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-2">
                            <CardHeader>
                                <CardTitle>Liste de vos organisation.</CardTitle>
                                <CardDescription>
                                    Vos organisations.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableCaption>Liste de vos organisation.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Siren</TableHead>
                                            <TableHead>Raison sociale</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {clients.map(client => {
                                            return (
                                                <TableRow key={client.siren}>
                                                    <TableCell>{client.siren}</TableCell>
                                                    <TableCell>{client.socialReason}</TableCell>
                                                    <TableCell><Badge variant={client.isBlocked ? "destructive" : "default"}>{client.isBlocked ? "Bloqué" : "Actif"}</Badge></TableCell>
                                                </TableRow>
                                            )
                                        })
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={3}>Total</TableCell>
                                            <TableCell className="text-right">{clients.length}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>

                        </Card>
                        <Card x-chunk="dashboard-04-chunk-2">
                            <CardHeader>
                                <CardTitle>Liste de vos logiciels.</CardTitle>
                                <CardDescription>
                                    Vos logiciels.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {softwares.map(software => {
                                    return (
                                        <ul key={software.slug}>
                                            <li>{software.label}</li>
                                        </ul>
                                    )
                                })
                                }
                            </CardContent>

                        </Card>

                    </div>
                </div>
            </div>
        </Container>
    )
}
