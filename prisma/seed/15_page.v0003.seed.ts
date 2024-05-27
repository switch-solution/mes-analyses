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

class PageV0003 extends Seed {
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
                await prisma.page.create({
                    data: {
                        id: 'STD_PAGE_0003',
                        internalId: 'STD_PAGE_0003',
                        level: 'Standard',
                        label: 'Page emploi',
                        order: 3,
                        status: 'Validé',
                        slug: 'STD_PAGE_0003',
                        version: 1,
                        Page_Block: {
                            create: [
                                {
                                    id: 'STD_BLOCK_0007',
                                    htmlElement: 'h1',
                                    type: 'Titre 1',
                                    label: 'Emploi',
                                    order: 1,
                                    slug: 'STD_BLOCK_0007',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0008',
                                    htmlElement: 'p',
                                    type: 'Paragraphe',
                                    label: 'Cette page permet de visualiser les informations relatives aux emplois.',
                                    order: 2,
                                    slug: 'STD_BLOCK_0008',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0009',
                                    htmlElement: 'form',
                                    type: 'form',
                                    label: 'Formulaire création emplois',
                                    order: 3,
                                    slug: 'STD_BLOCK_0009',
                                    level1: true
                                },

                            ]
                        }
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

export const pageV0003Seed = new PageV0003("PAGE_V0003", "Page emploi", 15, "PAGE_V0002")

