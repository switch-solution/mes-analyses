import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import Container from "@/components/layout/container"
import CardWithOptions from "@/components/layout/cardWithOptions";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
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
import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import Link from "next/link"
import { getBookByProjectSlug } from "@/src/query/book.query";
import { Badge } from "@/components/ui/badge";
import { getCountProjectTaskActive } from "@/src/query/project_task.query";
import { Button } from "@/components/ui/button";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {

    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const books = await getBookByProjectSlug(params.projectSlug)
    const countTasks = await getCountProjectTaskActive(params.projectSlug)
    const Skeleton = () => (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
    );
    const items = [
        {

            description: (
                <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/book/`}>Consulter les cahiers</Link>
            ),
            header: (<Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Libelle</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ouvrir</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books?.map(book =>
                        <TableRow key={book.projectLabel}>
                            <TableCell>{book.label}</TableCell>
                            <TableCell><Badge>En cours</Badge></TableCell>
                            <TableCell><Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/book/${book.slug}`}>Ouvrir</Link></TableCell>
                        </TableRow>)}
                </TableBody>

            </Table>

            ),
            className: "md:col-span-2",
            icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Taches en cours",
            description: (<Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/task`}>Consulter les taches</Link>),
            header: <span className="flex flex-col justify-center items-center h-full text-6xl">{countTasks}</span>,
            className: "md:col-span-1",
            icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "The Art of Design",
            description: "Discover the beauty of thoughtful and functional design.",
            header: <span>t</span>,
            className: "md:col-span-1",
            icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "The Power of Communication",
            description:
                "Understand the impact of effective communication in our lives.",
            header: <Skeleton />,
            className: "md:col-span-2",
            icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
        },
    ];

    return (
        <Container>
            <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
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

    );
}