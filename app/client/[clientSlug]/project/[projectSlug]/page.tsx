import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import Container from "@/components/layout/container"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ProjectUsersList } from "@/components/layout/projectUsersList";
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
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import { getUsersProject } from "@/src/query/project.query";
import { ArrowRight } from "lucide-react";
import { getPourcentageValidation } from "@/src/query/project_workflow.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {

    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const books = await getBookByProjectSlug(params.projectSlug)
    const countTasks = await getCountProjectTaskActive(params.projectSlug)
    const getUsers = await getUsersProject(params.projectSlug)
    const pourcentage = await getPourcentageValidation(params.projectSlug)
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
                            <TableCell><Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/book/${book.slug}`}><ArrowRight /></Link></TableCell>
                        </TableRow>)}
                </TableBody>

            </Table>

            ),
            className: "md:col-span-2",
            icon: <IconClipboardCopy className="size-4 text-neutral-500" />,
        },
        {
            title: "Taches en cours",
            description: (<Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/task`}>Consulter les taches</Link>),
            header: <span className="flex h-full flex-col items-center justify-center text-6xl">{countTasks}</span>,
            className: "md:col-span-1",
            icon: <IconFileBroken className="size-4 text-neutral-500" />,
        },
        {
            title: "Pourcentage de réalisation",
            description: (<Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/workflow`}>Avancement de la validation des cahiers</Link>),
            header: <span className="flex size-full flex-col items-center justify-center text-8xl">{pourcentage}%</span>,
            className: "md:col-span-1",
            icon: <IconSignature className="size-4 text-neutral-500" />,
        },
        {
            title: "L'équipe du projet",
            description: (<Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/user`}>Consulter l&apos;équipe projet</Link>),
            header: <ProjectUsersList users={getUsers} />,
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
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/`}>Projets</BreadcrumbLink>
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

    );
}