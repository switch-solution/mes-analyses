import { prisma } from "@/lib/prisma";
import { getClientActiveAndSoftwareActive } from "./security.query";
import { Prisma } from '@prisma/client'

export const getAllFormForMyActiveClientAndSoftwareActive = async () => {
    try {
        const myEnvironnement = await getClientActiveAndSoftwareActive()

        const form = await prisma.form.findMany({
            orderBy: {
                id: 'asc'
            }
        })
        const clientForm = await prisma.client_Form.findMany({
            where: {
                clientId: myEnvironnement.clientId

            },
            orderBy: {
                id: 'asc'

            }
        })
        const softwareForm = await prisma.software_Form.findMany({
            where: {
                clientId: myEnvironnement.clientId,
                softwareLabel: myEnvironnement.softwareLabel
            },
            orderBy: {
                id: 'asc'
            }

        })
        return [...form, ...clientForm, ...softwareForm]
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des processus")
    }

}

export const getFormInputByIdForMyActiveClientAndSoftware = async (id: string) => {
    try {
        const myEnvironnement = await getClientActiveAndSoftwareActive()
        const softwareForm = await prisma.software_Form.findFirst({
            where: {
                clientId: myEnvironnement.clientId,
                softwareLabel: myEnvironnement.softwareLabel,
                id: id
            },
            include: {
                Software_Form_Input: {
                    orderBy: {
                        order: 'asc'
                    }
                },

            },

        })
        const clientForm = await prisma.client_Form.findFirst({
            where: {
                clientId: myEnvironnement.clientId,
                id: id
            },
            include: {
                Client_Form_Input: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        })
        const form = await prisma.form.findFirst({
            where: {
                id: id
            },
            include: {
                Form_Input: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        })
        if (!softwareForm && !clientForm && !form) {
            throw new Error("Le formulaire n'existe pas")
        }
        const inputs = [...(softwareForm?.Software_Form_Input || []), ...(clientForm?.Client_Form_Input || []), ...(form?.Form_Input || [])]
        return inputs

    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération du processus")
    }

}

export type getFormInputByIdForMyActiveClientAndSoftware = Prisma.PromiseReturnType<typeof getFormInputByIdForMyActiveClientAndSoftware>;
