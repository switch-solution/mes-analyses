import { getMyClient } from '@/src/query/user.query';
import { redirect } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function Client() {

    const myClient = await getMyClient();

    if (!myClient) {
        redirect('/home')
    }

    if (myClient.length === 1) {
        redirect(`/client/${myClient?.at(0)?.id}`)
    }


    return (
        <Table>
            <TableCaption>Liste des clients.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Raison sociale</TableHead>
                    <TableHead>Siret</TableHead>
                    <TableHead className="text-right">Edition</TableHead>
                    <TableHead className="text-right">Suppression</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {myClient.map((client) => (
                    <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.socialReason}</TableCell>
                        <TableCell>{client.siret}</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                ))}


            </TableBody>
        </Table>




    )

}