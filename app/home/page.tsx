import { redirect } from "next/navigation"
import { userIsComplete } from "@/src/query/user.query"
import TinyLineChart from "@/components/chart/tinyLineChart"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Container from "@/components/layout/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { getMyProjects } from "@/src/query/project.query";
import { countMyAlert } from "@/src/query/alert.query";
import { getMyClientActive } from "@/src/query/client.query";
import { WhatIsNew } from "@/components/layout/whatIsNew";
import { countMyTaskActive } from "@/src/query/project_task.query";
export default async function Page() {
    const userIsSetup = await userIsComplete()

    const clientSlug = await getMyClientActive()
    if (!userIsSetup) {
        return redirect("/setup/cgv")

    }
    const projects = await getMyProjects()
    const countTask = await countMyTaskActive()

    const items = [
        {
            title: "Mes projets en cours",
            description: (<Link href={`/client/${clientSlug}/project/`}>Consulter vos projects</Link>),
            header: (<Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Logo</TableHead>
                        <TableHead>Libellé</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Ouvrir</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects?.map(project =>
                        <TableRow key={project.projectLabel}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={project.project.logo ? project.project.logo : undefined} />
                                    <AvatarFallback> {project.project.label?.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>{project.project.label}</TableCell>
                            <TableCell>{project.project.description}</TableCell>
                            <TableCell><Link href={`/client/${clientSlug}/project/${project.project.slug}`}><ArrowRight /></Link></TableCell>
                        </TableRow>)}
                </TableBody>

            </Table>

            ),
            className: "md:col-span-2",
            icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Mes taches",
            description: (<Link href={`/home/task`}>Consulter vos taches</Link>),
            header: <span className="flex flex-col justify-center items-center h-full text-6xl">{countTask}</span>,
            className: "md:col-span-1",
            icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Mes taches en attentes",
            description: "Consultez vos taches en attentes.",
            header: <TinyLineChart />,
            className: "md:col-span-1",
            icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Quoi de neuf ?",
            description:
                "Consultez les dernières mises à jour de vos projets.",
            header: <WhatIsNew />,
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