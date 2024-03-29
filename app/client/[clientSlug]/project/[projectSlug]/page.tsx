import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import Container from "@/components/layout/container"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ProjectUsersList } from "@/components/layout/projectUsersList";
import { getProcessusActiveByProjectSlug } from "@/src/query/project.query";
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
import { Slash } from "lucide-react"
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
import { getCountMyRowAwaitingApproval } from "@/src/query/user.query";
import { getProjectBySlug, getUsersProject } from "@/src/query/project.query";
import { notFound } from "next/navigation";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const getUsers = await getUsersProject(params.projectSlug)
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) {
        notFound()
    }
    const processusActive = await getProcessusActiveByProjectSlug({ softwareLabel: projectExist.softwareLabel, projectLabel: projectExist.label })
    const countAwaitingApprove = await getCountMyRowAwaitingApproval(params.projectSlug, userIsAuthorized.userId)
    const items = [
        {
            description: (
                <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/`}>Processus d&apos;analyse</Link>
            ),
            header: <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/`} className="flex size-full flex-col items-center justify-center text-2xl">Processus en cours {processusActive?.label}</Link>,
            className: "md:col-span-2",
            icon: <IconClipboardCopy className="size-4 text-neutral-500" />,
        },
        {
            title: "Lignes en attente de validation",
            description: (<Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/approve`}>Consulter les demandes</Link>),
            header: <span className="flex h-full flex-col items-center justify-center text-6xl">{countAwaitingApprove}</span>,
            className: "md:col-span-1",
            icon: <IconFileBroken className="size-4 text-neutral-500" />,
        },
        {
            title: "Pourcentage de réalisation",
            description: (<Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/workflow`}>Avancement de la validation des cahiers</Link>),
            header: <span className="flex size-full flex-col items-center justify-center text-8xl">5%</span>,
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
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/`}>Projets</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
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