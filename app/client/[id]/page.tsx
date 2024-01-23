import { getAuthSession } from "@/lib/auth"
import { getCountUsersClient, getCountInvitation, getCountSoftwareClient } from "@/src/query/client.query"
import { redirect } from 'next/navigation';
import { userIsAdminClient } from "@/src/query/security.query";
import { Suspense } from 'react';
import { UserRound } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
export default async function Client({ params }: { params: { id: string } }) {

    const session = await getAuthSession()
    if (!session) {
        redirect('/api/auth/signin');
    }
    if (session?.user?.id) {
        try {
            await userIsAdminClient(session.user.id, params.id)

        } catch (e) {
            redirect('/home');
        }
    }

    const countUser = await getCountUsersClient(params.id)
    const countInvitation = await getCountInvitation(params.id)
    const countSoftware = await getCountSoftwareClient(params.id)
    return (<>
        <div className="py-2">
            <Suspense fallback={<Skeleton />}>
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre d&apos;utilisateurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-950 text-2xl text-center"> {countUser}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/client/${params.id}/user`}> <UserRound /> Voir la liste</Link>
                    </CardFooter>
                </Card>
            </Suspense>
        </div>
        <div className="py-2">
            <Suspense fallback={<Skeleton />}>
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre de logiciel</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-950 text-2xl text-center"> {countSoftware}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/client/${params.id}/software`}> <UserRound /> Voir la liste</Link>
                    </CardFooter>
                </Card>
            </Suspense>
        </div>

        <div className="py-2">
            <Suspense fallback={<Skeleton />}>
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre de projets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-950 text-2xl text-center"> {countUser}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/client/${params.id}/users`}> <UserRound /> Voir la liste</Link>
                    </CardFooter>
                </Card>
            </Suspense>
        </div>

        <div className="py-2">
            <Suspense fallback={<Skeleton />}>
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre de contacts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-950 text-2xl text-center"> {countUser}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/client/${params.id}/users`}> <UserRound /> Voir la liste</Link>
                    </CardFooter>
                </Card>
            </Suspense>
        </div>


        <div className="py-2">
            <Suspense fallback={<Skeleton />}>
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre d&apos;invitaton en cours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-950 text-2xl text-center"> {countInvitation}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/client/${params.id}/invitation`}> <UserRound /> Voir la liste</Link>
                    </CardFooter>
                </Card>
            </Suspense>
        </div>
    </>

    )
}