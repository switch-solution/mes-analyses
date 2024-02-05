import { userIsEditor, userIsEditorClient } from "@/src/query/security.query";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from 'react';
import { getAuthSession } from "@/lib/auth"
import Link from "next/link";
import { UserRound } from "lucide-react";
import { countMyBookEditable } from "@/src/query/editor.query";
import { countStdComponent } from "@/src/query/stdcomponent.query";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default async function Page() {
    const session = await getAuthSession()
    if (!session?.user?.id) return redirect('/home')
    const isEditor = await userIsEditor();
    if (!isEditor) return redirect('/home')
    const countBooks = await countMyBookEditable()
    const countComponents = await countStdComponent()
    return (<>
        <div className="py-2">
            <Suspense fallback={<Skeleton />}>
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre de cahier</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-950 text-2xl text-center"> {countBooks}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/editor/book`}> <UserRound /> Voir la liste</Link>
                    </CardFooter>
                </Card>
            </Suspense>
        </div>
        <div className="py-2">
            <Suspense fallback={<Skeleton />}>
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre de composants</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-950 text-2xl text-center"> {countComponents}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/editor/component`}> <UserRound /> Voir la liste</Link>
                    </CardFooter>
                </Card>
            </Suspense>

        </div >

    </>)
}