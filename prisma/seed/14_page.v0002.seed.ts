//source :https://www.syntec.fr/wp-content/uploads/2022/11/2022-09-29-avenant-n-2-a-avenant-47-smh-signe.pdf
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

class PageV0002 extends Seed {
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
                        id: 'STD_PAGE_0002',
                        internalId: 'STD_PAGE_0002',
                        level: 'Standard',
                        label: 'Page établissement',
                        order: 1,
                        status: 'Validé',
                        slug: 'STD_PAGE_0002',
                        version: 1,
                        Page_Block: {
                            create: [
                                {
                                    id: 'STD_BLOCK_0004',
                                    htmlElement: 'h1',
                                    type: 'Titre 1',
                                    label: 'Etablissement',
                                    order: 1,
                                    slug: 'STD_BLOCK_0004',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0005',
                                    htmlElement: 'p',
                                    type: 'Paragraphe',
                                    label: 'Cette page permet de visualiser les informations relatives aux établissements.',
                                    order: 2,
                                    slug: 'STD_BLOCK_0005',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0006',
                                    htmlElement: 'form',
                                    type: 'form',
                                    label: 'Formulaire création étalissement',
                                    order: 3,
                                    slug: 'STD_BLOCK_0006',
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

export const pageV0002Seed = new PageV0002("PAGE_V0002", "Page établissement", 14, "PAGE_V0001")

