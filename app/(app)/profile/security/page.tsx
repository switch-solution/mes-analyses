import { Security } from "@/src/classes/security";
import { Container } from "@/components/layout/container";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import AlertDeleteUser from "@/components/alert/alertDeleteUser"
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
    const logs = await user.getLogs()
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
                        <Link href="/profile/security" className="font-semibold text-primary">Securité</Link>
                        <Link href="/profile/organization">Organisation</Link>
                        <Link href="#">Support</Link>
                        <Link href="#">Advanced</Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Désactiver mon compte.</CardTitle>
                                <CardDescription>
                                    La désactivation de votre compte entrainera votre déconnexion et vos données personnelles seront remplacées par des données anonymes.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AlertDeleteUser userId={user.userId} />
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                Désactivation du compte.
                            </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-04-chunk-2">
                            <CardHeader>
                                <CardTitle>Journal d&apos;activité</CardTitle>
                                <CardDescription>
                                    Vos données personnels.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableCaption>Liste de vos organisation.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Niveau</TableHead>
                                            <TableHead>Message</TableHead>
                                            <TableHead>Date de création</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {logs.map((log) => (
                                            <TableRow key={log.id}>
                                                <TableCell className="font-medium">{log.level}</TableCell>
                                                <TableCell>{log.message}</TableCell>
                                                <TableCell>{log.createdAt.toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={3}>Total</TableCell>
                                            <TableCell className="text-right">{logs.length}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                100 dernières activités
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            </div>
        </Container>
    )
}
