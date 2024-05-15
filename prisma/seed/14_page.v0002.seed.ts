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
                                    id: 'STD_BLOCK_0013',
                                    htmlElement: 'h1',
                                    type: 'Titre 1',
                                    label: 'Etablissement',
                                    order: 1,
                                    slug: 'STD_BLOCK_0013',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0014',
                                    htmlElement: 'p',
                                    type: 'Paragraphe',
                                    label: 'Cette page permet de visualiser les informations relatives aux établissements.',
                                    order: 2,
                                    slug: 'STD_BLOCK_0014',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0015',
                                    htmlElement: 'form',
                                    type: 'Formulaire',
                                    label: 'Formulaire création établissement',
                                    order: 3,
                                    slug: 'STD_BLOCK_0015',
                                    buttonLabel: 'Mettre à jour la société',
                                    level1: true
                                },
                                {
                                    id: 'STD_BLOCK_0016',
                                    blockMasterId: 'STD_BLOCK_0015',
                                    htmlElement: 'select',
                                    type: 'Liste déroulante',
                                    optionsFormId: 'STD_BLOCK_0003',
                                    optionsBlockId: 'STD_BLOCK_0004',
                                    label: 'SIREN',
                                    placeholder: '9999999999',
                                    minLength: 9,
                                    maxLength: 9,
                                    required: true,
                                    order: 4,
                                    slug: 'STD_BLOCK_0016',
                                },
                                {
                                    id: 'STD_BLOCK_0017',
                                    blockMasterId: 'STD_BLOCK_0015',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'NIC',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.11.001',
                                    minLength: 5,
                                    maxLength: 5,
                                    required: true,
                                    order: 6,
                                    slug: 'STD_BLOCK_0017',
                                },
                                {
                                    id: 'STD_BLOCK_0018',
                                    blockMasterId: 'STD_BLOCK_0015',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code APET',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.11.002',
                                    minLength: 5,
                                    maxLength: 5,
                                    required: true,
                                    order: 7,
                                    slug: 'STD_BLOCK_0018',
                                },
                                {
                                    id: 'STD_BLOCK_0019',
                                    blockMasterId: 'STD_BLOCK_0015',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Numéro, extension, nature et libellé de la voie',
                                    placeholder: 'Rue de la paix',
                                    sourceDsnId: 'S21.G00.11.003',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 8,
                                    slug: 'STD_BLOCK_0019',
                                },
                                {
                                    id: 'STD_BLOCK_0022',
                                    blockMasterId: 'STD_BLOCK_0015',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Complément de la localisation de la construction',
                                    placeholder: 'Batiment A',
                                    sourceDsnId: 'S21.G00.11.006',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 9,
                                    slug: 'STD_BLOCK_0022',
                                },
                                {
                                    id: 'STD_BLOCK_0023',
                                    blockMasterId: 'STD_BLOCK_0015',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Service de distribution, complément de localisation de la voie',
                                    placeholder: 'Service RH',
                                    sourceDsnId: 'S21.G00.11.006',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 10,
                                    slug: 'STD_BLOCK_0023',
                                },
                                {
                                    id: 'STD_BLOCK_0020',
                                    blockMasterId: 'STD_BLOCK_0015',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code postal',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.11.004',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 11,
                                    slug: 'STD_BLOCK_0020',
                                },
                                {
                                    id: 'STD_BLOCK_0021',
                                    blockMasterId: 'STD_BLOCK_0015',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Localité',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.11.005',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 12,
                                    slug: 'STD_BLOCK_0021',
                                },
                                {
                                    id: 'STD_BLOCK_0024',
                                    blockMasterId: 'STD_BLOCK_0015',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code pays',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.11.015',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 13,
                                    slug: 'STD_BLOCK_0024',
                                },
                                {
                                    id: 'STD_BLOCK_0025',
                                    blockMasterId: 'STD_BLOCK_0015',
                                    htmlElement: 'select',
                                    type: 'Liste déroulante',
                                    label: 'Structure juridique',
                                    placeholder: '12345',
                                    options: 'SARL;SAS;SA;EURL',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 5,
                                    slug: 'STD_BLOCK_0025',
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

