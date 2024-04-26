import { Security } from "@/src/classes/security";
import { Container } from "@/components/layout/container";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EditCgv } from "@/components/form/profil/editCgv";
import { User } from "@/src/classes/user";
import NavBarProfile from "@/components/layout/navBarProfil";
export default async function Page() {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error('User data not found')
    }
    const user = new User(userId.id)
    const userDetail = await user.getUserOtherData()
    return (
        <Container>
            <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Profil</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <NavBarProfile menu='CGV' />
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-2">
                            <CardHeader>
                                <CardTitle>Valider les CGV</CardTitle>
                                <CardDescription>
                                    Vos organisations.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <EditCgv cgv={userDetail.cgv} />
                            </CardContent>
                        </Card>


                    </div>
                </div>
            </div>
        </Container>
    )
}
