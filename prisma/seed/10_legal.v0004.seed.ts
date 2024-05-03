//source :https://www.syntec.fr/convention-collective/deplacements-et-changement-de-residence-en-france-metropolitaine-corse-comprise/#article-9-2
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

class LegalV0004 extends Seed {
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
                await prisma.classification.createMany({
                    data: [
                        {
                            idcc: "1486",
                            type: "position",
                            id: "Position 1.1",
                            label: "Position 1.1",
                            slug: "1486_position_1.1"
                        },
                        {
                            idcc: "1486",
                            type: "position",
                            id: "Position 1.2",
                            label: "Position 1.2",
                            slug: "1486_position_1.2"
                        },
                        {
                            idcc: "1486",
                            type: "position",
                            id: "Position 1.3",
                            label: "Position 1.3",
                            slug: "1486_position_1.3"
                        },
                        {
                            idcc: "1486",
                            type: "position",
                            id: "Position 1.4",
                            label: "Position 1.4",
                            slug: "1486_position_1.4"
                        },
                        {
                            idcc: "1486",
                            type: "position",
                            id: "Position 2.1",
                            label: "Position 2.1",
                            slug: "1486_position_2.1"
                        },
                        {
                            idcc: "1486",
                            type: "position",
                            id: "Position 2.2",
                            label: "Position 2.2",
                            slug: "1486_position_2.2"
                        },
                        {
                            idcc: "1486",
                            type: "position",
                            id: "Position 2.3",
                            label: "Position 2.3",
                            slug: "1486_position_2.3"
                        },
                        {
                            idcc: "1486",
                            type: "position",
                            id: "Position 3.1",
                            label: "Position 3.1",
                            slug: "1486_position_3.1"
                        },
                        {
                            idcc: "1486",
                            type: "position",
                            id: "Position 3.2",
                            label: "Position 3.2",
                            slug: "1486_position_3.2"
                        },
                        {
                            idcc: "1486",
                            type: "position",
                            id: "Position 3.3",
                            label: "Position 3.3",
                            slug: "1486_position_3.3"
                        },
                        {
                            idcc: "1486",
                            type: "coefficient",
                            id: "95",
                            label: "95",
                            slug: "1486_coefficient_95"
                        },
                        {
                            idcc: "1486",
                            type: "coefficient",
                            id: "100",
                            label: "100",
                            slug: "1486_coefficient_100"
                        },
                        {
                            idcc: "1486",
                            type: "coefficient",
                            id: "105",
                            label: "105",
                            slug: "1486_coefficient_105"
                        },
                        {
                            idcc: "1486",
                            type: "coefficient",
                            id: "115",
                            label: "115",
                            slug: "1486_coefficient_115"
                        },
                        {
                            idcc: "1486",
                            type: "coefficient",
                            id: "130",
                            label: "130",
                            slug: "1486_coefficient_130"
                        },
                        {
                            idcc: "1486",
                            type: "coefficient",
                            id: "150",
                            label: "150",
                            slug: "1486_coefficient_150"
                        },
                        {
                            idcc: "1486",
                            type: "coefficient",
                            id: "170",
                            label: "170",
                            slug: "1486_coefficient_170"
                        },
                        {
                            idcc: "1486",
                            type: "coefficient",
                            id: "210",
                            label: "210",
                            slug: "1486_coefficient_210"
                        },
                        {
                            idcc: "1486",
                            type: "coefficient",
                            id: "270",
                            label: "270",
                            slug: "1486_coefficient_270"
                        },


                    ]

                })
                await this.seedUpdateStatus("completed")
            }



        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const legalV0004Seed = new LegalV0004("LEGAL_V0004", "Syntec classification", 10, "LEGAL_V0003")

