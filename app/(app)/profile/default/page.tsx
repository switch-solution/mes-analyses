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

import EditUserEnvironnementClient from "@/components/form/user_environnement/editUserEnvironnementClient";
import EditUserEnvironnementSoftware from "@/components/form/user_environnement/editUserEnvironnementSoftware";
export default async function Page() {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error('User data not found')
    }
    const user = new User(userId.id)
    const clients = await user.getMyClientsAll()
    const softwares = await user.getMySoftwaresAll()
    const clientActive = await user.getMyClientActive()
    const softwareActive = await user.getMySoftwareActive()
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
                        <Link href="/profile/default" className="font-semibold text-primary">Environnement</Link>
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
                                <EditUserEnvironnementClient clientActive={clientActive.clientSlug} clients={clients} />
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
                                <EditUserEnvironnementSoftware softwareActive={softwareActive.softwareSlug} softwares={softwares} />
                            </CardContent>

                        </Card>

                    </div>
                </div>
            </div>
        </Container>
    )
}
