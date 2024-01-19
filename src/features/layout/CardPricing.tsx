'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
type CardProps = {
    title: string
    description: string
    content: string
    footer: string | React.JSX.Element

}

import { LogIn } from "lucide-react";

export const CardPricing = ({
    title,
    description,
    content,
}: CardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
            <CardFooter>
                <Link href={`/register`}> <LogIn />Essayer</Link>
            </CardFooter>
        </Card>

    )

}