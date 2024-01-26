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
                label: "Champ numérique",
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
                type: "checkbox",
            },
            update: {},
            create: {
                name: "Checkbox",
                type: "checkbox",
                label: "Bouton radio",
                createdBy: "admin"
            }


        })
        console.log("Checbox created")
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
                type: "React_Quill",
            },
            update: {},
            create: {
                name: "Textarea",
                type: "React_Quill",
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
                type: "dsnSiren",
            },
            update: {},
            create: {
                name: "Siren DSN",
                type: "dsnSiren",
                label: "Siren DSN",
                createdBy: "admin"
            }
        })
        console.log("Siren dsn")
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