import { getEndTrialClient, getClientSirenBySlug } from "@/src/query/client.query"
import Container from "@/components/layout/container";
import { userIsAdminClient } from "@/src/query/security.query";
import TinyLineChart from "@/components/chart/tinyLineChart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
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

import Link from "next/link"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { getUsersClientList } from "@/src/query/client.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {

    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour acceder à cette page.")
    const endTrial = await getEndTrialClient(params.clientSlug)
    const userClient = await getUsersClientList(params.clientSlug)

    const items = [
        {
            title: "Utilisateurs",
            description: "Gérez vos utilisateurs.",
            header: (<Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Avatar</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Ouvrir</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userClient?.map(user =>
                        <TableRow key={user.userId}>
                            <TableCell>      <Avatar>
                                <AvatarImage src={user.user.image ? user.user.image : undefined} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar></TableCell>
                            <TableCell>{user.user.UserOtherData.at(0)?.lastname}</TableCell>
                            <TableCell>{user.user.UserOtherData.at(0)?.firstname}</TableCell>
                            <TableCell><Link href={`/client/${params.clientSlug}/administrator/user/${user.userId}`}>Ouvrir</Link></TableCell>
                        </TableRow>)}
                </TableBody>

            </Table>

            ),
            className: "md:col-span-2",
            icon: <IconClipboardCopy className="size-4 text-neutral-500" />,
        },
        {
            title: "Fin période de test",
            description: "Nombre de jours restants avant la fin de la période de test",
            header: <span className="flex h-full flex-col items-center justify-center text-6xl">{endTrial}</span>,
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