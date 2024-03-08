import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient(
    {
        log: [
            {
                emit: 'stdout',
                level: 'query',
            },
            {
                emit: 'stdout',
                level: 'error',
            },
            {
                emit: 'stdout',
                level: 'info',
            },
            {
                emit: 'stdout',
                level: 'warn',
            },
        ],
    }
)
import { Seed } from "./seedModel"

class ItemV0001Seed extends Seed {
    constructor(
        protected name: string,
        protected description: string,
        protected order: number,
        protected previousLabel: string
    ) {
        super(name, description, order, previousLabel)
    }

    async run() {
        const seedExist = await this.seedIsComplete()
        const previousStatus = await this.previousSeedIsComplete()
        try {
            if (previousStatus && !seedExist) {
                await this.seedUpdateStatus("pending")
                await prisma.item.upsert({
                    where: {
                        id_type: {
                            id: "STD_0001",
                            type: "Rémunération"
                        },
                    },
                    update: {},
                    create: {
                        id: "STD_0001",
                        nature: "Salaire de base",
                        type: "Rémunération",
                        label: "Salaire de base",
                        createdBy: "system",
                        comment: "Remboursement",
                        baseType: "Element de la fiche salarié",
                        base: "Horaire mensuel",
                        rateType: "Element de la fiche salarié",
                        rate: "Taux horaire",
                        amountType: "Formule",
                        amount: "base*taux"
                    }

                })
                await prisma.item.upsert({
                    where: {
                        id_type: {
                            id: "STD_0002",
                            type: "Rémunération"
                        },
                    },
                    update: {},
                    create: {
                        id: "STD_0002",
                        nature: "Commission",
                        type: "Rémunération",
                        label: "Commission",
                        createdBy: "system",
                        comment: "Commission",
                        amountType: "Element à saisir"
                    }

                })
                await prisma.item.upsert({
                    where: {
                        id_type: {
                            id: "STD_0003",
                            type: "Rémunération"
                        },
                    },
                    update: {},
                    create: {
                        id: "STD_0003",
                        nature: "Prime ancienneté",
                        type: "Rémunération",
                        label: "Prime ancienneté",
                        createdBy: "system",
                        comment: "Prime ancienneté",
                        baseType: "Montant rubrique",
                        base: "STD_0001",
                        rateType: "Table",
                        rate: "Table ancienneté",
                        amountType: "Formule",
                        amount: "base*taux"
                    }

                })

                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const itemV0001Seed = new ItemV0001Seed("ITEM_V0001", "Rubriques de base", 28, "DEFAULT_SETTING_V0001")

