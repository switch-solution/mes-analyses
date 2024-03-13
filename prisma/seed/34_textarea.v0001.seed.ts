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

class TextareaV0001 extends Seed {
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

                await prisma.textArea.create({
                    data: {
                        label: "Etablissement",
                        value: [{
                            id: "5e815f00-f89f-4dbc-ba99-1c61ae032b3a",
                            type: "heading",
                            props: {
                                toto: "tata"
                            }

                        }],
                        description: "Etablissement de l'entreprise",
                        package: "BlockNote"
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

export const textareaV0001 = new TextareaV0001("TEXTAREA_V0001", "Ajout d un champ texte", 34, "OPS_V0004")

