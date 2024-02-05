"use server";
import { prisma } from "@/lib/prisma";
import { userIsAdminSystem, userIsValid } from "@/src/query/security.query";
import { getPricingAt } from "@/src/query/setting.query";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { CreateInvoiceSchema } from "@/src/helpers/definition";
import { getClientById, getClientsToInvoices, getUsersClientList } from "@/src/query/client.query";
import { getCountUsersClient } from "@/src/query/client.query";
import { addOneMonth } from "@/src/helpers/addMonth";
import { createEvent } from "@/src/query/logger.query";
import type { Event } from "@/src/helpers/type";
import { getUserById } from "@/src/query/user.query";
export const createInvoices = async (formdata: FormData) => {
    try {
        const userId = await userIsValid()
        const userIsAdmin = await userIsAdminSystem()
        if (!userIsAdmin) throw new Error("Vous n'êtes pas autorisé à effectuer cette action.")
        const { date } = CreateInvoiceSchema.parse({
            date: formdata.get('date')
        })
        const convertDate = new Date(date)
        const settingPrice = await getPricingAt(convertDate)
        const clientsToInvoice = await getClientsToInvoices(convertDate)

        for (let client of clientsToInvoice) {
            let quantityClient = await getCountUsersClient(client.id)
            const clientInfo = await getClientById(client.id)
            let amount = quantityClient * settingPrice
            const invoiceLines = []
            const getUserByClient = await getUsersClientList(client.id)
            for (let user of getUserByClient) {
                console.log(user.id)
                let userInfo = await getUserById(user.userId)
                let invoiceLine = {
                    label: "Abonnement",
                    email: userInfo.email ? userInfo.email : "",
                    amount: settingPrice,
                    quantity: 1,
                    createdBy: userId,
                    status: "Facturable"
                }
                invoiceLines.push(invoiceLine)
            }
            await prisma.invoice.create({
                data: {
                    clientId: client.id,
                    socialReason: clientInfo?.socialReason ? clientInfo.socialReason : "",
                    dateStart: convertDate,
                    dateEnd: addOneMonth(convertDate),
                    dateLimit: convertDate,
                    amount: amount,
                    quantity: quantityClient,
                    status: "en attente",
                    createdBy: userId,
                    InvoiceLine: {
                        create: invoiceLines
                    }
                }
            })
            await prisma.client.update({
                where: {
                    id: client.id
                },
                data: {
                    dateStartTrial: null,
                    dateEndTrial: null,
                    invoiceStart: convertDate,
                    invoiceEnd: addOneMonth(convertDate),
                }
            })

            const event: Event = {
                level: "warning",
                message: `Creation d'une facture pour le client ${clientInfo?.socialReason} pour un montant de ${amount}€ en date du ${convertDate.toLocaleDateString()}`,
                scope: "invoice",
                createdBy: userId
            }
            await createEvent(event);


        }

    } catch (err) {
        console.log(err)
        throw new Error("Error in generating bill")
    }

    revalidatePath("/administrator/invoice")
    redirect("/administrator/invoice")

}