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

class FormV0001 extends Seed {
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
                await prisma.form.create({
                    data: {
                        id: 'STD_FORM_0001',
                        slug: 'STD_FORM_0001',
                        internalId: 'STD_FORM_0001',
                        label: 'Formulaire société',
                        status: 'Validé',
                        version: 1,
                        FormField: {
                            create: [
                                {
                                    id: 'STD_FIELD_0001',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    sourceDsnId: 'S21.G00.06.001',
                                    label: 'SIREN',
                                    placeholder: '9999999999',
                                    minLength: 9,
                                    maxLength: 9,
                                    required: true,
                                    order: 4,
                                    slug: 'STD_FIELD_0001',
                                },
                                {
                                    id: 'STD_FIELD_0002',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Raison sociale',
                                    placeholder: 'Société Martin',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 5,
                                    slug: 'STD_FIELD_0002',
                                },
                                {
                                    id: 'STD_FIELD_0003',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'APEN',
                                    placeholder: '1 rue de la paix',
                                    minLength: 1,
                                    maxLength: 5,
                                    required: true,
                                    order: 6,
                                    slug: 'STD_FIELD_0003',
                                    sourceDsnId: 'S21.G00.06.003'
                                },
                                {
                                    id: 'STD_FIELD_0004',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Numéro, extension, nature et libellé de la voie',
                                    placeholder: '1 rue de la paix',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 7,
                                    slug: 'STD_FIELD_0004',
                                    sourceDsnId: 'S21.G00.06.004'
                                },
                                {
                                    id: 'STD_FIELD_0008',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Complément de la localisation de la construction',
                                    placeholder: 'Batiment A',
                                    minLength: 5,
                                    maxLength: 5,
                                    order: 8,
                                    slug: 'STD_FIELD_0008',
                                    sourceDsnId: 'S21.G00.06.007'
                                },
                                {
                                    id: 'STD_FIELD_0009',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Service de distribution, complément de localisation de la voie',
                                    placeholder: 'Service RH',
                                    minLength: 1,
                                    maxLength: 255,
                                    order: 9,
                                    slug: 'STD_FIELD_0009',
                                    sourceDsnId: 'S21.G00.06.008'
                                },
                                {
                                    id: 'STD_FIELD_0010',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code postal',
                                    placeholder: '75000',
                                    minLength: 5,
                                    maxLength: 5,
                                    order: 10,
                                    slug: 'STD_FIELD_0010',
                                    sourceDsnId: 'S21.G00.06.005'
                                },
                                {
                                    id: 'STD_FIELD_0011',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Localité',
                                    placeholder: 'Paris',
                                    minLength: 1,
                                    maxLength: 255,
                                    order: 11,
                                    slug: 'STD_FIELD_0011',
                                    sourceDsnId: 'S21.G00.06.006'
                                },
                                {
                                    id: 'STD_FIELD_0012',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code pays',
                                    placeholder: 'FR',
                                    minLength: 1,
                                    maxLength: 255,
                                    order: 12,
                                    slug: 'STD_FIELD_0012',
                                    sourceDsnId: 'S21.G00.06.010'
                                },

                            ]
                        }
                    }
                })

                await prisma.form.create({
                    data: {
                        id: 'STD_FORM_0002',
                        slug: 'STD_FORM_0002',
                        label: 'Formulaire établissement',
                        internalId: 'STD_FORM_0002',
                        status: 'Validé',
                        buttonLabel: 'Mettre à jour les étalissements',
                        version: 1,
                        FormField: {
                            create: [
                                {
                                    id: 'STD_FIELD_0013',
                                    htmlElement: 'select',
                                    type: 'Liste déroulante',
                                    optionsFormId: 'STD_FORM_0001',
                                    optionsInputId: 'STD_FIELD_0001',
                                    label: 'SIREN',
                                    placeholder: '9999999999',
                                    minLength: 9,
                                    maxLength: 9,
                                    required: true,
                                    order: 4,
                                    slug: 'STD_FIELD_0013',
                                },
                                {
                                    id: 'STD_FIELD_0014',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'NIC',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.11.001',
                                    minLength: 5,
                                    maxLength: 5,
                                    required: true,
                                    order: 6,
                                    slug: 'STD_FIELD_0014',
                                },
                                {
                                    id: 'STD_FIELD_0015',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code APET',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.11.002',
                                    minLength: 5,
                                    maxLength: 5,
                                    required: true,
                                    order: 7,
                                    slug: 'STD_FIELD_0015',
                                },
                                {
                                    id: 'STD_FIELD_0016',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Numéro, extension, nature et libellé de la voie',
                                    placeholder: 'Rue de la paix',
                                    sourceDsnId: 'S21.G00.11.003',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 8,
                                    slug: 'STD_FIELD_0016',
                                },
                                {
                                    id: 'STD_FIELD_0017',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Complément de la localisation de la construction',
                                    placeholder: 'Batiment A',
                                    sourceDsnId: 'S21.G00.11.006',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 9,
                                    slug: 'STD_FIELD_0017',
                                },
                                {
                                    id: 'STD_FIELD_0018',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Service de distribution, complément de localisation de la voie',
                                    placeholder: 'Service RH',
                                    sourceDsnId: 'S21.G00.11.006',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 10,
                                    slug: 'STD_FIELD_0018',
                                },
                                {
                                    id: 'STD_FIELD_0019',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code postal',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.11.004',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 11,
                                    slug: 'STD_FIELD_0019',
                                },
                                {
                                    id: 'STD_FIELD_0020',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Localité',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.11.005',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 12,
                                    slug: 'STD_FIELD_0021',
                                },
                                {
                                    id: 'STD_FIELD_0022',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code pays',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.11.015',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 13,
                                    slug: 'STD_FIELD_0022',
                                },
                                {
                                    id: 'STD_FIELD_0023',
                                    htmlElement: 'select',
                                    type: 'Liste déroulante',
                                    label: 'Structure juridique',
                                    placeholder: '12345',
                                    options: 'SARL;SAS;SA;EURL',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 5,
                                    slug: 'STD_FIELD_0023',
                                },

                            ]
                        }
                    }
                })

                await prisma.form.create({
                    data: {
                        id: 'STD_FORM_0003',
                        slug: 'STD_FORM_0003',
                        internalId: 'STD_FORM_0003',
                        label: 'Formulaire emplois',
                        status: 'Validé',
                        buttonLabel: 'Mettre à jour les emplois',
                        version: 1,
                        FormField: {
                            create: [
                                {
                                    id: 'STD_FIELD_0024',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Code emploi',
                                    placeholder: '001',
                                    minLength: 1,
                                    maxLength: 99,
                                    required: true,
                                    order: 1,
                                    slug: 'STD_FIELD_0024',
                                },
                                {
                                    id: 'STD_FIELD_0025',
                                    htmlElement: 'input',
                                    type: 'Champ texte',
                                    label: 'Libellé emploi',
                                    placeholder: '12345',
                                    sourceDsnId: 'S21.G00.40.006',
                                    minLength: 1,
                                    maxLength: 255,
                                    required: true,
                                    order: 2,
                                    slug: 'STD_FIELD_0025',
                                },

                            ]
                        }
                    }
                })

                await prisma.page_Block_Form.createMany({
                    data: [
                        {
                            formId: 'STD_FORM_0001',
                            formVersion: 1,
                            pageBlockId: 'STD_BLOCK_0003',
                        },
                        {
                            formId: 'STD_FORM_0002',
                            formVersion: 1,
                            pageBlockId: 'STD_BLOCK_0006',
                        },
                        {
                            formId: 'STD_FORM_0003',
                            formVersion: 1,
                            pageBlockId: 'STD_BLOCK_0009',
                        }
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

export const formV0001Seed = new FormV0001("FORM_V0001", "Formulaire société/établissement/emploi", 17, "SETTING_V0002")

