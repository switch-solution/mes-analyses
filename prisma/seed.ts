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
                name: "Input_text"
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
                name: "Input_number"
            },
            update: {},
            create: {
                name: "Input_number",
                type: "text",
                label: "Champ numérique",
                createdBy: "admin"
            }


        })
        console.log("Input_number created")
        await prisma.standard_Input.upsert({
            where: {
                name: "Select"
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
                name: "Checkbox"
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
                name: "Switch"
            },
            update: {},
            create: {
                name: "Switch",
                type: "checkbox",
                label: "Bouton switch",
                createdBy: "admin"
            }


        })
        console.log("Switch created")
        await prisma.standard_Input.upsert({
            where: {
                name: "Textarea"
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
                name: "Image"
            },
            update: {},
            create: {
                name: "Image",
                type: "Image",
                label: "Image",
                createdBy: "admin"
            }
        })
        console.log("Textarea created")
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