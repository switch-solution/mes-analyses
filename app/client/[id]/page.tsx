import { getAuthSession } from "@/lib/auth"
import { getCountUsersClient, getCountInvitation, getCountSoftwareClient, getCountProjectClient } from "@/src/query/client.query"
import { redirect } from 'next/navigation';
import { userIsAdminClient } from "@/src/query/security.query";
import { Suspense } from 'react';
import { UserRound } from "lucide-react";
import CardWithOptions from "@/src/features/layout/CardWithOptions";
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
    const countProject = await getCountProjectClient(params.id)
    return (<div className="py-2 flex flex-col justify-around md:grid md:grid-rows-3 md:grid-flow-col md:gap-4 lg:grid-rows-2">

        <CardWithOptions titre="Nombre d&apos;utilisateurs" content={countUser} href={`/client/${params.id}/user`} />
        <CardWithOptions titre="Nombre de logiciel" content={countSoftware} href={`/client/${params.id}/software`} />
        <CardWithOptions titre="Nombre de projets" content={countProject} href={`/client/${params.id}/project`} />
        <CardWithOptions titre="Nombre de contacts" content={countProject} href={`/client/${params.id}/contact`} />
        <CardWithOptions titre="Nombre d&apos;invitation en cours" content={countInvitation} href={`/client/${params.id}/invitation`} />

    </div>

    )
}