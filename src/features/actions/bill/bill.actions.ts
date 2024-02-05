import { prisma } from "@/lib/prisma";
import { getCountUserIsBillable, getUsersIsBillableDetail } from "@/src/query/client.query";
import { userIsAdminSystem } from "@/src/query/security.query";
import { getPricingAt } from "@/src/query/setting.query";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
export const generateBill = async () => {
    try {
        const userIsAdmin = await userIsAdminSystem()
        if (!userIsAdmin) throw new Error("Vous n'êtes pas autorisé à effectuer cette action.")
        const date = new Date()
        const clients = await prisma.client.findMany({
            where: {
                isBlocked: false
            }
        })
        const settingPrice = await getPricingAt(new Date())
        for (let client of clients) {
            let userCountBillable = await getCountUserIsBillable(client.id)
            let userBillableDetail = await getUsersIsBillableDetail(client.id)
            let amount = settingPrice * userCountBillable
            if (amount > 0) {
                await prisma.bill.create({
                    data: {
                        clientId: client.id,
                        amount: amount,
                        dateStart: new Date(date.getFullYear(), date.getMonth(), 1),
                        dateEnd: new Date(date.getFullYear(), date.getMonth() + 30),
                        status: "En attente",
                        dateLimit: new Date(date.getFullYear(), date.getMonth() + 1, 30),
                        quantity: userCountBillable,
                        createdBy: "SYSTEM",
                    },
                })

            }
        }

    } catch (err) {
        console.log(err)
        throw new Error("Error in generating bill")
    }

}