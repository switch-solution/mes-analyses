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
export default function About() {

    return (
        <div>
            <span>Mes analyses paie : version beta 1</span>
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