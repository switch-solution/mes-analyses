import { prisma } from "@/lib/prisma";
import { userIsAdminSystem } from "./security.query";
export const getCountAllInvoices = async () => {
    try {
        const userIsAdmin = await userIsAdminSystem()
        if (!userIsAdmin) {
            throw new Error("Vous n'êtes pas autorisé à effectuer cette action");
        }
        const count = await prisma.invoice.count();
        return count;
    } catch (err) {
        console.error(err);
        throw new Error("Erreur lors de la récupération des factures");
    }

}

export const getAllInvoices = async () => {
    try {
        const userIsAdmin = await userIsAdminSystem()
        if (!userIsAdmin) {
            throw new Error("Vous n'êtes pas autorisé à effectuer cette action");
        }
        const count = await prisma.invoice.findMany({
            orderBy: {
                dateStart: 'desc'
            }
        });
        return count;
    } catch (err) {
        console.error(err);
        throw new Error("Erreur lors de la récupération des factures");
    }

}
