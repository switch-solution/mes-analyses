
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
export async function formSeed() {
    try {
        const SEED_NAME = "formSeed"
        const seedExist = await prisma.prisma_Seed.findFirst({
            where: {
                name: SEED_NAME,
                status: "completed"

            }
        })
        if (!seedExist) {
            await prisma.prisma_Seed.upsert({
                where: {
                    name: SEED_NAME
                },
                update: {
                    name: SEED_NAME,
                    createdBy: "system",
                    status: "pending"
                },
                create: {
                    name: SEED_NAME,
                    createdBy: "system",
                    status: "pending"
                }
            })

            await prisma.input.upsert({
                where: {
                    type: "text",
                },
                update: {
                    name: "Input_text",
                    type: "text",
                    label: "Champ texte",
                    createdBy: "system"
                },
                create: {
                    name: "Input_text",
                    type: "text",
                    label: "Champ texte",
                    createdBy: "system"
                }


            })
            console.log("Input_text created")
            await prisma.input.upsert({
                where: {
                    type: "number",
                },
                update: {
                    name: "Input_number",
                    type: "number",
                    label: "Champ numérique",
                    createdBy: "system"
                },
                create: {
                    name: "Input_number",
                    type: "number",
                    label: "Champ numérique",
                    createdBy: "system"
                }


            })
            console.log("Input_number created")
            await prisma.input.upsert({
                where: {
                    type: "date",
                },
                update: {
                    name: "Input_date",
                    type: "date",
                    label: "Champ date",
                    createdBy: "system"
                },
                create: {
                    name: "Input_date",
                    type: "date",
                    label: "Champ date",
                    createdBy: "system"
                }


            })
            console.log("Input_date created")
            await prisma.input.upsert({
                where: {
                    type: "select",
                },
                update: {
                    name: "Select",
                    type: "select",
                    label: "Liste déroulante",
                    createdBy: "system"
                },
                create: {
                    name: "Select",
                    type: "select",
                    label: "Liste déroulante",
                    createdBy: "system"
                }


            })
            console.log("Select created")
            await prisma.input.upsert({
                where: {
                    type: "switch",
                },
                update: {
                    name: "Switch",
                    type: "switch",
                    label: "Bouton switch",
                    createdBy: "system"
                },
                create: {
                    name: "Switch",
                    type: "switch",
                    label: "Bouton switch",
                    createdBy: "system"
                }
            })
            console.log("Switch created")
            await prisma.input.upsert({
                where: {
                    type: "Textarea",
                },
                update: {
                    name: "Textarea",
                    type: "Textarea",
                    label: "Zone de texte",
                    createdBy: "system"
                },
                create: {
                    name: "Textarea",
                    type: "Textarea",
                    label: "Zone de texte",
                    createdBy: "system"
                }


            })
            console.log("Textarea created")
            await prisma.input.upsert({
                where: {
                    type: "Image",
                },
                update: {
                    name: "Image",
                    type: "Image",
                    label: "Image",
                    createdBy: "system"
                },
                create: {
                    name: "Image",
                    type: "Image",
                    label: "Image",
                    createdBy: "system"
                }
            })
            console.log("Image created")
            await prisma.input.upsert({
                where: {
                    type: "dsnSocietySiren",
                },
                update: {
                    name: "Siren DSN",
                    type: "dsnSocietySiren",
                    label: "Siren de la société",
                    createdBy: "system"
                },
                create: {
                    name: "Siren DSN",
                    type: "dsnSocietySiren",
                    label: "Siren de la société",
                    createdBy: "system"
                }
            })
            await prisma.input.upsert({
                where: {
                    type: "dsnSocietySiren",
                },
                update: {
                    name: "Raison sociale de la société",
                    type: "dsnSocietySiren",
                    label: "Raison sociale de la société",
                    createdBy: "system"
                },
                create: {
                    name: "Raison sociale de la société",
                    type: "dsnSocietySiren",
                    label: "Raison sociale de la société",
                    createdBy: "system"
                }
            })
            console.log("Siren dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnEstablishmentSiret",
                },
                update: {
                    name: "Siret DSN",
                    type: "dsnEstablishmentSiret",
                    label: "Siret de l'établissement",
                    createdBy: "system"
                },
                create: {
                    name: "Siret DSN",
                    type: "dsnEstablishmentSiret",
                    label: "Siret de l'établissement",
                    createdBy: "system"
                }
            })
            console.log("Siren dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnEstablishmentApe",
                },
                update: {
                    name: "APE DSN",
                    type: "dsnEstablishmentApe",
                    label: "APE DSN",
                    createdBy: "system"
                },
                create: {
                    name: "APE DSN",
                    type: "dsnEstablishmentApe",
                    label: "APE DSN",
                    createdBy: "system"
                }
            })
            await prisma.input.upsert({
                where: {
                    type: "dsnSocietyAddress1",
                },
                update: {
                    name: "Société adresse 1 DSN",
                    type: "dsnSocietyAddress1",
                    label: "Adresse 1",
                    createdBy: "system"
                },
                create: {
                    name: "Société adresse 1 DSN",
                    type: "dsnSocietyAddress1",
                    label: "Adresse 1",
                    createdBy: "system"
                }
            })
            console.log("Adresse 1 socitety dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnSocietyAddress2",
                },
                update: {
                    name: "Société adresse 2 DSN",
                    type: "dsnSocietyAddress2",
                    label: "Adresse 2",
                    createdBy: "system"
                },
                create: {
                    name: "Société adresse 2 DSN",
                    type: "dsnSocietyAddress2",
                    label: "Adresse 2",
                    createdBy: "system"
                }
            })
            console.log("Adresse 2 society dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnSocietyAddress3",
                },
                update: {
                    name: "Society adresse 3 DSN",
                    type: "dsnSocietyAddress3",
                    label: "Adresse 3",
                    createdBy: "system"
                },
                create: {
                    name: "Society adresse 3 DSN",
                    type: "dsnSocietyAddress3",
                    label: "Adresse 3",
                    createdBy: "system"
                }
            })
            console.log("Adresse 3 establish dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnSocietyZipCode",
                },
                update: {
                    name: "Société code postal DSN",
                    type: "dsnSocietyZipCode",
                    label: "Code postal",
                    createdBy: "system"
                },
                create: {
                    name: "Société code postal DSN",
                    type: "dsnSocietyZipCode",
                    label: "Code postal",
                    createdBy: "system"
                }
            })
            console.log("ZipCode establish dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnSocietyCity",
                },
                update: {
                    name: "Société ville DSN",
                    type: "dsnSocietyCity",
                    label: "Ville",
                    createdBy: "system"
                },
                create: {
                    name: "Société ville DSN",
                    type: "dsnSocietyCity",
                    label: "Ville",
                    createdBy: "system"
                }
            })
            console.log("City society dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnEstablishmentAddress1",
                },
                update: {
                    name: "Etablissement adresse 1 DSN",
                    type: "dsnEstablishmentAddress1",
                    label: "Adresse 1",
                    createdBy: "system"
                },
                create: {
                    name: "Etablissement adresse 1 DSN",
                    type: "dsnEstablishmentAddress1",
                    label: "Adresse 1",
                    createdBy: "system"
                }
            })
            console.log("Adresse 1 establish dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnEstablishmentAddress2",
                },
                update: {
                    name: "Etablissement adresse 2 DSN",
                    type: "dsnEstablishmentAddress2",
                    label: "Adresse 2",
                    createdBy: "system"
                },
                create: {
                    name: "Etablissement adresse 2 DSN",
                    type: "dsnEstablishmentAddress2",
                    label: "Adresse 2",
                    createdBy: "system"
                }
            })
            console.log("Adresse 1 establish dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnEstablishmentAddress3",
                },
                update: {
                    name: "Etablissement adresse 3 DSN",
                    type: "dsnEstablishmentAddress3",
                    label: "Adresse 3",
                    createdBy: "system"
                },
                create: {
                    name: "Etablissement adresse 3 DSN",
                    type: "dsnEstablishmentAddress3",
                    label: "Adresse 3",
                    createdBy: "system"
                }
            })
            console.log("Adresse 3 establish dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnEstablishmentZipCode",
                },
                update: {
                    name: "Etablissement code postal DSN",
                    type: "dsnEstablishmentZipCode",
                    label: "Code postal",
                    createdBy: "system"
                },
                create: {
                    name: "Etablissement code postal DSN",
                    type: "dsnEstablishmentZipCode",
                    label: "Code postal",
                    createdBy: "system"
                }
            })
            console.log("ZipCode establish dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnEstablishmentCity",
                },
                update: {
                    name: "Etablissement ville DSN",
                    type: "dsnEstablishmentCity",
                    label: "Ville",
                    createdBy: "system"
                },
                create: {
                    name: "Etablissement ville DSN",
                    type: "dsnEstablishmentCity",
                    label: "Ville",
                    createdBy: "system"
                }
            })
            console.log("City establish dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsnJobLabel",
                },
                update: {
                    name: "Libellé emploi DSN",
                    type: "dsnJobLabel",
                    label: "Libellé emploi",
                    createdBy: "system"
                },
                create: {
                    name: "Libellé emploi DSN",
                    type: "dsnJobLabel",
                    label: "Libellé emploi",
                    createdBy: "system"
                }
            })
            console.log("Job label dsn")
            await prisma.input.upsert({
                where: {
                    type: "dsncode",
                },
                update: {
                    name: "Code convention collective DSN",
                    type: "dsncode",
                    label: "Code code",
                    createdBy: "system"
                },
                create: {
                    name: "Code convention collective DSN",
                    type: "dsncode",
                    label: "Code code",
                    createdBy: "system"
                }
            })
            console.log("Job label dsn")


            await prisma.form.upsert({
                where: {
                    title_type_version: {
                        title: "Société",
                        type: "DSN_SOCIETE",
                        version: 1
                    }
                },
                update: {
                    title: "Société",
                    type: "DSN_SOCIETE",
                    status: "actif",
                    version: 1,
                    Form_Input: {
                        create: [{
                            type: 'dsnSocietySiren',
                            label: 'siren',
                            maxLength: 9,
                            minLength: 1,
                            placeholder: "123456789",
                            order: 1,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'insee_siren',
                            label: 'Raison sociale',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Ma société",
                            order: 2,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyApeCode',
                            label: 'Code APE',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Ma société",
                            order: 3,
                            required: true,
                            readonly: true,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyAddress1',
                            label: 'Adresse',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Rue du test",
                            order: 4,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyAddress2',
                            label: 'Complément adresse',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Batiment A",
                            order: 5,
                            required: false,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyAddress3',
                            label: 'Adresse 3',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Service paie",
                            order: 6,
                            required: false,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyZipCode',
                            label: 'Code postal',
                            maxLength: 5,
                            minLength: 1,
                            placeholder: "75000",
                            order: 7,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyCity',
                            label: 'Ville',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Paris",
                            order: 8,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },]
                    }

                },
                create: {
                    title: "Société",
                    type: "DSN_SOCIETE",
                    status: "actif",
                    description: 'Formulaire de création des sociétés',
                    version: 1,
                    createdBy: "system",
                    Form_Input: {
                        create: [{
                            type: 'dsnSocietySiren',
                            label: 'siren',
                            maxLength: 9,
                            minLength: 1,
                            placeholder: "123456789",
                            order: 1,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'insee_siren',
                            label: 'Raison sociale',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Ma société",
                            order: 2,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyApeCode',
                            label: 'Code APE',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Ma société",
                            order: 3,
                            required: true,
                            readonly: true,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyAddress1',
                            label: 'Adresse',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Rue du test",
                            order: 4,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyAddress2',
                            label: 'Complément adresse',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Batiment A",
                            order: 5,
                            required: false,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyAddress3',
                            label: 'Adresse 3',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Service paie",
                            order: 6,
                            required: false,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyZipCode',
                            label: 'code postal',
                            maxLength: 5,
                            minLength: 1,
                            placeholder: "75000",
                            order: 7,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnSocietyCity',
                            label: 'Ville',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Paris",
                            order: 8,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },]
                    }
                }

            })
            console.log('Form society created')

            await prisma.form.upsert({
                where: {
                    title_type_version: {
                        title: "Etablissement",
                        type: "DSN_ETABLISSEMENT",
                        version: 1
                    }
                },
                update: {
                    title: "Etablissement",
                    type: "DSN_ETABLISSEMENT",
                    status: "actif",

                    version: 1,
                    Form_Input: {
                        create: [{
                            type: 'dsnEstablishmentNic',
                            label: 'nic',
                            maxLength: 5,
                            minLength: 1,
                            placeholder: "12345",
                            order: 1,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'insee_siren',
                            label: 'Raison sociale',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Mon établissement",
                            order: 2,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'select',
                            label: 'siren',
                            inputSource: 'Société-DSN_SOCIETE-dsnSocietySiren-siren',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Ma société",
                            order: 3,
                            required: true,
                            readonly: true,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnEstablishmentAddress1',
                            label: 'Adresse',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Rue du test",
                            order: 4,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnEstablishmentAddress2',
                            label: 'Complément adresse',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Batiment A",
                            order: 5,
                            required: false,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnEstablishmentAddress3',
                            label: 'Adresse 3',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Service paie",
                            order: 6,
                            required: false,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnEstablishmentZipCode',
                            label: 'code postal',
                            maxLength: 5,
                            minLength: 1,
                            placeholder: "75000",
                            order: 7,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnEstablishmentCity',
                            label: 'Ville',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Paris",
                            order: 8,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },]
                    }

                },
                create: {
                    title: "Etablissement",
                    type: "DSN_ETABLISSEMENT",
                    status: "actif",
                    description: 'Formulaire de création des établissements',
                    version: 1,
                    createdBy: "system",
                    Form_Input: {
                        create: [{
                            type: 'dsnEstablishmentNic',
                            label: 'nic',
                            maxLength: 5,
                            minLength: 1,
                            placeholder: "12345",
                            order: 1,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'insee_siren',
                            label: 'Raison sociale',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Mon établissement",
                            order: 2,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'select',
                            label: 'siren',
                            inputSource: 'Société-DSN_SOCIETE-dsnSocietySiren-siren',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Ma société",
                            order: 3,
                            required: true,
                            readonly: true,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnEstablishmentAddress1',
                            label: 'Adresse',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Rue du test",
                            order: 4,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnEstablishmentAddress2',
                            label: 'Complément adresse',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Batiment A",
                            order: 5,
                            required: false,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnEstablishmentAddress3',
                            label: 'Adresse 3',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Service paie",
                            order: 6,
                            required: false,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnEstablishmentZipCode',
                            label: 'code postal',
                            maxLength: 5,
                            minLength: 1,
                            placeholder: "75000",
                            order: 7,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },
                        {
                            type: 'dsnEstablishmentCity',
                            label: 'Ville',
                            maxLength: 50,
                            minLength: 1,
                            placeholder: "Paris",
                            order: 8,
                            required: true,
                            readonly: false,
                            createdBy: "system"
                        },]
                    }
                }

            })
            console.log('Form établissement created')

            await prisma.form.upsert({
                where: {
                    title_type_version: {
                        title: "Emploi",
                        type: "DSN_EMPLOI",
                        version: 1
                    }
                },
                update: {
                    title: "Emploi",
                    type: "DSN_EMPLOI",
                    version: 1,
                    status: "actif",
                    Form_Input: {
                        create: [
                            {
                                type: 'text',
                                label: 'Code emploi',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "001",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'dsnJobLabel',
                                label: 'Libellé emploi',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Consultant",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                        ]
                    }

                },
                create: {
                    title: "Emploi",
                    type: "DSN_EMPLOI",
                    description: 'Formulaire de création des emplois',
                    status: "actif",
                    version: 1,
                    createdBy: "system",
                    Form_Input: {
                        create: [
                            {
                                type: 'text',
                                label: 'Code emploi',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "001",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'dsnJobLabel',
                                label: 'Libellé emploi',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Consultant",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                        ]
                    }
                }

            })
            console.log('Form emploi created')
            await prisma.prisma_Seed.update({
                where: {
                    name: SEED_NAME
                },
                data: {

                    status: "completed"
                }
            })
        }


    } catch (err) {
        const SEED_NAME = "formSeed"

        await prisma.prisma_Seed.update({
            where: {
                name: SEED_NAME
            },
            data: {

                status: "error"
            }
        })
        console.error(err)
    }

}
