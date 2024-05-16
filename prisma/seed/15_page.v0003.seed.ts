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
                                    id: 'STD_BLOCK_0026',
                                    htmlElement: 'h1',
                                    type: 'Titre 1',
                                    label: 'Emploi',
                                    order: 1,
                                    slug: 'STD_BLOCK_0026',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0027',
                                    htmlElement: 'p',
                                    type: 'Paragraphe',
                                    label: 'Cette page permet de visualiser les informations relatives aux emplois.',
                                    order: 2,
                                    slug: 'STD_BLOCK_0027',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0028',
                                    htmlElement: 'form',
                                    type: 'Formulaire',
                                    label: 'Formulaire création emplois',
                                    order: 3,
                                    slug: 'STD_BLOCK_0028',
                                    buttonLabel: 'Mettre à jour les emplois',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0029',
                                    blockMasterId: 'STD_BLOCK_0028',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code emploi',
                                    placeholder: '001',
                                    minLength: 1,
                                    maxLength: 99,
                                    required: true,
                                    order: 6,
                                    slug: 'STD_BLOCK_0029',
                                },
                                {
                                    id: 'STD_BLOCK_0030',
                                    blockMasterId: 'STD_BLOCK_0028',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Libellé emploi',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.40.006',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 7,
                                    slug: 'STD_BLOCK_0030',
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

