import { userIsEditor } from "@/src/query/security.query";
import CardWithOptions from "@/components/layout/cardWithOptions";
import Container from "@/components/layout/container";
import { getCountMySoftware } from "@/src/query/client.query";
import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import { ArrowRight } from "lucide-react";
import Link from "next/link"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import TinyLineChart from "@/components/chart/tinyLineChart"
import { getStdBookByClientFilterByUserSoftware } from "@/src/query/software_book.query";
import { getComponentFilterByUser } from "@/src/query/client.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const countSoftwares = await getComponentFilterByUser(params.clientSlug)
    const books = await getStdBookByClientFilterByUserSoftware(params.clientSlug)
    const items = [
        {
            title: "Cahiers",
            description: (<Link href={`/client/${params.clientSlug}/editor/book`}>Voir vos cahiers</Link>),
            header: (<Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Logiciel</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Ouvrir</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books?.map(book =>
                        <TableRow key={book.slug}>
                            <TableCell>{book.softwareLabel}</TableCell>
                            <TableCell>{book.label}</TableCell>
                            <TableCell>{book.description}</TableCell>
                            <TableCell><Link href={`/client/${params.clientSlug}/editor/book/${book.slug}`}><ArrowRight /></Link></TableCell>
                        </TableRow>)}
                </TableBody>

            </Table>

            ),
            className: "md:col-span-2",
            icon: <IconClipboardCopy className="size-4 text-neutral-500" />,
        },
        {
            title: "Nombre de composants",
            description: (<Link href={`/client/${params.clientSlug}/editor/component`}>Voir les composants</Link>),
            header: <span className="flex h-full flex-col items-center justify-center text-6xl">{countSoftwares}</span>,
            className: "md:col-span-1",
            icon: <IconFileBroken className="size-4 text-neutral-500" />,
        },
        {
            title: "Mes projets",
            description: "Discover the beauty of thoughtful and functional design.",
            header: <TinyLineChart />,
            className: "md:col-span-1",
            icon: <IconSignature className="size-4 text-neutral-500" />,
        },
        {
            title: "The Power of Communication",
            description:
                "Understand the impact of effective communication in our lives.",
            header: <p>test</p>,
            className: "md:col-span-2",
            icon: <IconTableColumn className="size-4 text-neutral-500" />,
        },
    ];
    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={item.className}
                        icon={item.icon}
                    />
                ))}
            </BentoGrid>

        </Container>

    )
}