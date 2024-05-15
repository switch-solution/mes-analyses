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

class PageV0001 extends Seed {
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
                        id: 'STD_PAGE_0001',
                        internalId: 'STD_PAGE_0001',
                        level: 'Standard',
                        label: 'Page société',
                        order: 1,
                        status: 'Validé',
                        slug: 'STD_PAGE_0001',
                        version: 1,
                        Page_Block: {
                            create: [
                                {
                                    id: 'STD_BLOCK_0001',
                                    htmlElement: 'h1',
                                    type: 'Titre 1',
                                    label: 'Sociétés',
                                    order: 1,
                                    slug: 'STD_BLOCK_0001',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0002',
                                    htmlElement: 'p',
                                    type: 'Paragraphe',
                                    label: 'Cette page permet de visualiser les informations relatives aux sociétés.',
                                    order: 2,
                                    slug: 'STD_BLOCK_0002',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0003',
                                    htmlElement: 'form',
                                    type: 'Formulaire',
                                    label: 'Formulaire création société',
                                    order: 3,
                                    slug: 'STD_BLOCK_0003',
                                    buttonLabel: 'Mettre à jour la société',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0004',
                                    blockMasterId: 'STD_BLOCK_0003',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    sourceDsnId: 'S21.G00.06.001',
                                    label: 'SIREN',
                                    placeholder: '9999999999',
                                    minLength: 9,
                                    maxLength: 9,
                                    required: true,
                                    order: 4,
                                    slug: 'STD_BLOCK_0004',
                                },
                                {
                                    id: 'STD_BLOCK_0005',
                                    blockMasterId: 'STD_BLOCK_0003',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Raison sociale',
                                    placeholder: 'Société Martin',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 5,
                                    slug: 'STD_BLOCK_0005',
                                },
                                {
                                    id: 'STD_BLOCK_0006',
                                    blockMasterId: 'STD_BLOCK_0003',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'APEN',
                                    placeholder: '1 rue de la paix',
                                    minLength: 1,
                                    maxLength: 5,
                                    required: true,
                                    order: 6,
                                    slug: 'STD_BLOCK_0006',
                                    sourceDsnId: 'S21.G00.06.003'
                                },
                                {
                                    id: 'STD_BLOCK_0007',
                                    blockMasterId: 'STD_BLOCK_0003',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Numéro, extension, nature et libellé de la voie',
                                    placeholder: '1 rue de la paix',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 7,
                                    slug: 'STD_BLOCK_0007',
                                    sourceDsnId: 'S21.G00.06.004'
                                },
                                {
                                    id: 'STD_BLOCK_0008',
                                    blockMasterId: 'STD_BLOCK_0003',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Complément de la localisation de la construction',
                                    placeholder: 'Batiment A',
                                    minLength: 5,
                                    maxLength: 5,
                                    order: 8,
                                    slug: 'STD_BLOCK_0008',
                                    sourceDsnId: 'S21.G00.06.007'
                                },
                                {
                                    id: 'STD_BLOCK_0009',
                                    blockMasterId: 'STD_BLOCK_0003',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Service de distribution, complément de localisation de la voie',
                                    placeholder: 'Service RH',
                                    minLength: 1,
                                    maxLength: 255,
                                    order: 9,
                                    slug: 'STD_BLOCK_0009',
                                    sourceDsnId: 'S21.G00.06.008'
                                },
                                {
                                    id: 'STD_BLOCK_0010',
                                    blockMasterId: 'STD_BLOCK_0003',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code postal',
                                    placeholder: '75000',
                                    minLength: 5,
                                    maxLength: 5,
                                    order: 10,
                                    slug: 'STD_BLOCK_0010',
                                    sourceDsnId: 'S21.G00.06.005'
                                },
                                {
                                    id: 'STD_BLOCK_0011',
                                    blockMasterId: 'STD_BLOCK_0003',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Localité',
                                    placeholder: 'Paris',
                                    minLength: 1,
                                    maxLength: 255,
                                    order: 11,
                                    slug: 'STD_BLOCK_0011',
                                    sourceDsnId: 'S21.G00.06.006'
                                },
                                {
                                    id: 'STD_BLOCK_0012',
                                    blockMasterId: 'STD_BLOCK_0003',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code pays',
                                    placeholder: 'FR',
                                    minLength: 1,
                                    maxLength: 255,
                                    order: 12,
                                    slug: 'STD_BLOCK_0012',
                                    sourceDsnId: 'S21.G00.06.010'
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

export const pageV0001Seed = new PageV0001("PAGE_V0001", "Page société", 13, "OPS_V0002")

