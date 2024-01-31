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

async function main() {
    try {
        await prisma.standard_Input.upsert({
            where: {
                type: "text",
            },
            update: {},
            create: {
                name: "Input_text",
                type: "text",
                label: "Champ texte",
                createdBy: "admin"
            }


        })
        console.log("Input_text created")
        await prisma.standard_Input.upsert({
            where: {
                type: "number",
            },
            update: {},
            create: {
                name: "Input_number",
                type: "number",
                label: "Champ numérique",
                createdBy: "admin"
            }


        })
        console.log("Input_number created")
        await prisma.standard_Input.upsert({
            where: {
                type: "date",
            },
            update: {},
            create: {
                name: "Input_date",
                type: "date",
                label: "Champ date",
                createdBy: "admin"
            }


        })
        console.log("Input_date created")
        await prisma.standard_Input.upsert({
            where: {
                type: "select",
            },
            update: {},
            create: {
                name: "Select",
                type: "select",
                label: "Liste déroulante",
                createdBy: "admin"
            }


        })
        console.log("Select created")
        await prisma.standard_Input.upsert({
            where: {
                type: "switch",
            },
            update: {},
            create: {
                name: "Switch",
                type: "switch",
                label: "Bouton switch",
                createdBy: "admin"
            }


        })
        console.log("Switch created")
        await prisma.standard_Input.upsert({
            where: {
                type: "Textarea",
            },
            update: {},
            create: {
                name: "Textarea",
                type: "Textarea",
                label: "Zone de texte",
                createdBy: "admin"
            }


        })
        console.log("Textarea created")
        await prisma.standard_Input.upsert({
            where: {
                type: "Image",
            },
            update: {},
            create: {
                name: "Image",
                type: "Image",
                label: "Image",
                createdBy: "admin"
            }
        })
        console.log("Image created")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietySiren",
            },
            update: {},
            create: {
                name: "Siren DSN",
                type: "dsnSocietySiren",
                label: "Siren de la société",
                createdBy: "admin"
            }
        })
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietySiren",
            },
            update: {},
            create: {
                name: "Raison sociale de la société",
                type: "dsnSocietySiren",
                label: "Raison sociale de la société",
                createdBy: "admin"
            }
        })
        console.log("Siren dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentSiret",
            },
            update: {},
            create: {
                name: "Siret DSN",
                type: "dsnEstablishmentSiret",
                label: "Siret de l'établissement",
                createdBy: "admin"
            }
        })
        console.log("Siren dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentApe",
            },
            update: {},
            create: {
                name: "APE DSN",
                type: "dsnEstablishmentApe",
                label: "APE DSN",
                createdBy: "admin"
            }
        })
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietyAddress1",
            },
            update: {},
            create: {
                name: "Société adresse 1 DSN",
                type: "dsnSocietyAddress1",
                label: "Adresse 1",
                createdBy: "admin"
            }
        })
        console.log("Adresse 1 socitety dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietyAddress2",
            },
            update: {},
            create: {
                name: "Société adresse 2 DSN",
                type: "dsnSocietyAddress2",
                label: "Adresse 2",
                createdBy: "admin"
            }
        })
        console.log("Adresse 2 society dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietyAddress3",
            },
            update: {},
            create: {
                name: "Society adresse 3 DSN",
                type: "dsnSocietyAddress3",
                label: "Adresse 3",
                createdBy: "admin"
            }
        })
        console.log("Adresse 3 establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietyZipCode",
            },
            update: {},
            create: {
                name: "Société code postal DSN",
                type: "dsnSocietyZipCode",
                label: "Code postal",
                createdBy: "admin"
            }
        })
        console.log("ZipCode establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietyCity",
            },
            update: {},
            create: {
                name: "Société ville DSN",
                type: "dsnSocietyCity",
                label: "Ville",
                createdBy: "admin"
            }
        })
        console.log("City society dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentAddress1",
            },
            update: {},
            create: {
                name: "Etablissement adresse 1 DSN",
                type: "dsnEstablishmentAddress1",
                label: "Adresse 1",
                createdBy: "admin"
            }
        })
        console.log("Adresse 1 establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentAddress2",
            },
            update: {},
            create: {
                name: "Etablissement adresse 2 DSN",
                type: "dsnEstablishmentAddress2",
                label: "Adresse 2",
                createdBy: "admin"
            }
        })
        console.log("Adresse 1 establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentAddress3",
            },
            update: {},
            create: {
                name: "Etablissement adresse 3 DSN",
                type: "dsnEstablishmentAddress3",
                label: "Adresse 3",
                createdBy: "admin"
            }
        })
        console.log("Adresse 3 establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentZipCode",
            },
            update: {},
            create: {
                name: "Etablissement code postal DSN",
                type: "dsnEstablishmentZipCode",
                label: "Code postal",
                createdBy: "admin"
            }
        })
        console.log("ZipCode establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentCity",
            },
            update: {},
            create: {
                name: "Etablissement ville DSN",
                type: "dsnEstablishmentCity",
                label: "Ville",
                createdBy: "admin"
            }
        })
        console.log("City establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnJobLabel",
            },
            update: {},
            create: {
                name: "Libellé emploi DSN",
                type: "dsnJobLabel",
                label: "Libellé emploi",
                createdBy: "admin"
            }
        })
        console.log("Job label dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnIdcc",
            },
            update: {},
            create: {
                name: "Code convention collective DSN",
                type: "dsnIdcc",
                label: "Code IDCC",
                createdBy: "admin"
            }
        })
        console.log("Job label dsn")
    } catch (err) {
        console.error(err)
    }

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })