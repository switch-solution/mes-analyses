
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

export async function chapterFormV0001Seed() {
    try {
        const SEED_NAME = "CHAPTER_FORM_V0001"
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
            await prisma.chapterForm.upsert({
                where: {
                    bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                        bookLabel: "Structure juridique",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        formTitle: "Société",
                        formType: "DSN_SOCIETE",
                        formVersion: 1
                    }
                },
                update: {},
                create: {
                    bookLabel: "Structure juridique",
                    level_1: 1,
                    level_2: 0,
                    level_3: 0,
                    formTitle: "Société",
                    formType: "DSN_SOCIETE",
                    formVersion: 1
                }
            })
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
        }
        await prisma.prisma_Seed.update({
            where: {
                name: SEED_NAME
            },
            data: {

                status: "completed"
            }
        })
    } catch (e) {
        const SEED_NAME = "CHAPTER_FORM_V0001"

        await prisma.prisma_Seed.update({
            where: {
                name: SEED_NAME
            },
            data: {

                status: "error"
            }
        })
    }


}