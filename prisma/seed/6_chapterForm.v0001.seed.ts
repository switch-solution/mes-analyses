
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

class ChapterFormV0001Seed extends Seed {
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


                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Structure juridique",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Etablissement",
                            formType: "DSN_ETABLISSEMENT",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        bookLabel: "Structure juridique",
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        formTitle: "Etablissement",
                        formType: "DSN_ETABLISSEMENT",
                        formVersion: 1
                    }
                })
                await this.seedUpdateStatus("completed")

            }
        } catch (err) {
            console.log(err)
            await this.seedUpdateStatus("error")
            await this.updateError(JSON.stringify(err))
        }
    }
}

export const chapterFormV0001Seed = new ChapterFormV0001Seed("CHAPTER_FORM_V0001", "Association des chapitres et des componsants du cahier entreprise", 6, "LEGAL_V0001")