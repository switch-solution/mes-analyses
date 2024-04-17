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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import EditUser from "@/components/form/user/editUser";
export default async function Page() {
    const security = new Security()
    const user = await security.userIsValid()
    const userOtherData = user?.UserOtherData.at(0)
    if (!userOtherData) {
        throw new Error('User data not found')
    }
    const { firstname, lastname, civility } = userOtherData
    const userData: {
        firstname: string,
        lastname: string,
        email: string,
        civility: 'M' | 'Mme'
    } = {
        firstname: firstname ? firstname : 'John',
        lastname: lastname ? lastname : 'Doe',
        civility: userOtherData.civility as 'M' | 'Mme',
        email: user?.email ? user.email : 'johndoe@email.fr'
    }
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
                        <Link href="/profile" className="font-semibold text-primary">
                            Mes informations
                        </Link>
                        <Link href="/profile/security">Securité</Link>
                        <Link href="/profile/organization">Organisation</Link>
                        <Link href="#">Support</Link>
                        <Link href="#">Advanced</Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Mes données personnelles</CardTitle>
                                <CardDescription>
                                    Vos données personnels
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <EditUser user={userData} />
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                Mettre à jour vos données personnelles
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </Container>
    )
}
