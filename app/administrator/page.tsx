import { userIsAdminSystem } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import { getCountAllInvoices } from "@/src/query/invoice.query";
import CardWithOptions from "@/components/layout/cardWithOptions";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import TinyLineChart from "@/components/chart/tinyLineChart";
import Link from "next/link"

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
export default async function Page() {
    const isAdmin = await userIsAdminSystem()
    if (!isAdmin) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page")
    }

    const items = [
        {
            title: "Mes projets en cours",
            description: (<Link href={`/client//project/`}>Consulter vos projects</Link>),
            header: "test",
            className: "md:col-span-2",
            icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Mes taches",
            description: (<Link href={`/home/task`}>Consulter vos taches</Link>),
            header: <span className="flex flex-col justify-center items-center h-full text-6xl">test</span>,
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
            header: "test",
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