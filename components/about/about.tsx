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
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getLastSeedOrder } from "@/src/query/prisma.query"
import { userIsValid } from "@/src/query/security.query"

export default async function About() {

    return (
        <div>
            <Table>
                <TableCaption>Version</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Logiciel</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Licence</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Mes analyses</TableCell>
                        <TableCell><Badge>0.1.0</Badge></TableCell>
                        <TableCell className="text-right">En attente</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Version de la bae de données</TableCell>
                        <TableCell><Badge><Link href={'/about/bdd'}>39</Link></Badge></TableCell>
                        <TableCell className="text-right"></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table>
                <TableCaption>Liste des dépendances.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Librairie</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Licence</TableHead>
                        <TableHead className="text-right">Site</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Next JS</TableCell>
                        <TableCell><Badge>14.1.3</Badge></TableCell>
                        <TableCell className="text-right">MIT</TableCell>
                        <TableCell className="text-right"><Link href={"https://nextjs.org/"}>nextjs.org</Link></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Prisma</TableCell>
                        <TableCell><Badge>5.11</Badge></TableCell>
                        <TableCell className="text-right">Apache 2</TableCell>
                        <TableCell className="text-right"><Link href={"https://www.prisma.io/"}>prisma.io</Link></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}