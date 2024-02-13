import { Suspense } from 'react';
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function CardWithOptions({ titre, content, href }: { titre: string, content: string | number, href: string }) {
    return (<div className="py-2">

        <Suspense fallback={<Skeleton />}>
            <Card className='h-44 w-80'>
                <CardHeader>
                    <CardTitle>{titre}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl text-center"> <span>{content}</span></p>
                </CardContent>
                <CardFooter className='flex justify-end'>
                    <ExternalLink className='mr-2' />
                    <Link href={href}>Voir la liste</Link>
                </CardFooter>
            </Card>
        </Suspense>

    </div>)

}